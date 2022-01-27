const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios').default;

const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override, Content-Type, Cache-Control, Accept',
};

const server = express();
server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));

async function loadIds(path, n){
    return axios.get(path)
        .then(function (response) {
            return response.data.slice(0, n);
        }).catch((error) => {
            console.log(`loadIds() failed with: ${error}`);
        });
}

async function loadData(path){
    return axios.get(path)
        .then(function (response) {
            return response.data;
        }).catch((error) => {
            console.log(`loadData() failed with: ${error}`);
        });
}

async function getItemsByIds(path, storiesId){
    if(!storiesId){
        return [];
    }
    let promises = [];
    for (let id of storiesId){
        promises.push(loadData(`${path}/item/${id}.json`));
    }
    return await Promise.all(promises);
}


async function getStories(path, n){
    let storiesId = await loadIds(`${path}/topstories.json`, n);
    console.log(storiesId);
    return await getItemsByIds(path, storiesId);
}

async function getComments(path, storyId){
    let commentsId = await loadData(`${path}/item/${storyId}.json`);
    console.log(commentsId.kids);
    return await getItemsByIds(path, commentsId.kids);
}


const dbpath = 'https://hacker-news.firebaseio.com/v0';
const n = 100;
let storiesCached = [];


server.get('/stories', (req, res) => {
    getStories(dbpath, n).then((stories) => {
        res.send(stories);
        storiesCached = stories;
    }).catch((error) => {
        console.log(`Getting stories failed with ${error}`);
    });
});

server.get('/comments/:id', (req, res) => {
    let id = +req.params.id;
    getComments(dbpath, id).then((comments) => {
        res.send(comments);
    }).catch((error) => {
        console.log(`Getting root comments failed with ${error}`);
    });
});

server.get('/comment', (req, res) => {
    let ids = req.query.ids;
    if (ids){
        getItemsByIds(dbpath, ids).then((comments) => {
            res.send(comments);
        }).catch((error) => {
            console.log(`Getting comments by id's failed with ${error}`);
        });
    }
});

server.get('/story/:id', (req, res) => {
   let id = +req.params.id;
   loadData(`${dbpath}/item/${id}.json`).then((story) => {
       res.send(story);
   }).catch((error) => {
       console.log(`Getting story by id failed with ${error}`);
   });
});

server.get('/sort/date', (req, res) => {
    if (storiesCached) {
        res.send(storiesCached.sort(function (a, b) {
            return (+b.time) - (+a.time);
        }))
    } else {
        getStories(dbpath, n).then((stories) => {
            res.send(stories.sort(function (a, b) {
                return (+b.time) - (+a.time);
            }));
        }).catch((error) => {
            console.log(`Sorting by date failed with ${error} while loading data`);
        });
    }
});

server.get('/sort/rating', (req, res) => {
    if (storiesCached) {
        res.send(storiesCached.sort(function (a, b) {
            return (+b.score) - (+a.score);
        }))
    } else {
        getStories(dbpath, n).then((stories) => {
            res.send(stories.sort(function (a, b) {
                return (+b.score) - (+a.score);
            }));
        }).catch((error) => {
            console.log(`Sorting by rating failed with ${error} while loading data`);
        });
    }
});


server.listen(8080);
module.exports = server;
