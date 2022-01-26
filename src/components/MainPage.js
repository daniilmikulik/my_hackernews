import React from "react";
import AppNavbar from './AppNavbar';
import MainDescription from "./MainDescription";
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from "./ControlPanel";
import axios from "axios";
import MainTable from "./MainTable";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'stories': []
        }
        this.mounted = true;
        this.interval = null;
    }

    componentDidMount() {
        this.loadStories();
        this.interval = setInterval(() => {
            this.loadStories()
        }, 60000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.interval);
    }

    loadStories = () => {
        axios.get('http://localhost:8080/stories').then((stories)=>{
            console.log(stories);
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        });
    }

    sortByDate = () => {
        axios.get('http://localhost:8080/sort/date').then((stories)=>{
            console.log('sorted date called');
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        });
    }

    sortByRating = () => {
        axios.get('http://localhost:8080/sort/rating').then((stories)=>{
            console.log(stories);
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        });
    }


    render() {
        return (
            <div>
                <AppNavbar load={this.loadStories}/>
                <MainDescription/>
                <ControlPanel sortByDate={this.sortByDate} sortByRating={this.sortByRating}/>
                <MainTable stories={this.state.stories}/>
            </div>
        );
    }
}

export default MainPage;