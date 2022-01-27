import React from "react";
import AppNavbar from './AppNavbar';
import MainDescription from "./MainDescription";
import 'bootstrap/dist/css/bootstrap.min.css';
import ControlPanel from "./ControlPanel";
import axios from "axios";
import MainTable from "./MainTable";
import {Container} from "react-bootstrap";

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
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        }).catch((error) => {
            console.log(`Loading stories failed with ${error}`);
        });
    }

    sortByDate = () => {
        axios.get('http://localhost:8080/sort/date').then((stories)=>{
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        }).catch((error) => {
            console.log(`Sorting by date failed with ${error}`);
        });
    }

    sortByRating = () => {
        axios.get('http://localhost:8080/sort/rating').then((stories)=>{
            if (this.mounted) {
                this.setState({"stories": stories.data});
            }
        }).catch((error) => {
            console.log(`Sorting by rating failed with ${error}`);
        });
    }


    render() {
        return (
            <div>
                <header id={'home'}>
                    <AppNavbar load={this.loadStories}/>
                </header>
                <Container>
                    <MainDescription/>
                    <ControlPanel sortByDate={this.sortByDate} sortByRating={this.sortByRating}/>
                    <MainTable stories={this.state.stories}/>
                </Container>
            </div>
        );
    }
}

export default MainPage;