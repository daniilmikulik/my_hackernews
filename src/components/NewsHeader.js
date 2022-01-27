import React from 'react';
import axios from "axios";
import {Container, Spinner} from "react-bootstrap";

class NewsHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'story': []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/story/${this.props.ident}`).then((story)=>{
            //console.log(story);
            this.setState({"story": story.data});
            this.render();
        }).catch((error) => {
            console.log(`Loading story header failed with ${error}`);
        });
    }

    setContent(){
        let story = this.state.story;
        if (story !== 0){
            let date = new Date(+story.time * 1000).toLocaleString();
            return (
                <>
                    <h1>Название статьи: {story.title} </h1>
                    <h3>Автор: {story.by} </h3>
                    <h3>Ссылка на оригинал: <a href={story.url}> {story.url} </a> </h3>
                    <h3>Дата публикации: {date} </h3>
                </>
            )
        } else {
            return (
                <div className={'flex-row'}>
                    <p className={'justify-content-center'}> Идет загрузка статьи: </p>
                    <Spinner animation={'border'} className={'justify-content-center'}/>
                </div>);
        }
    }

    render(){
        return(
            <Container className="container-fluid">
                {this.setContent()}
            </Container>
        );
    }
}

export default NewsHeader;
