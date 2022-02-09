import React from 'react';
import {Container, Spinner} from "react-bootstrap";
import {CommentChildren} from "./Comment";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class CommentsTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"comments": []}
        this.mounted = true;
        this.interval = null;
    }

    componentDidMount() {
        this.loadComments();
        this.interval = setInterval(() => {
            this.loadComments()
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.mounted = false;
    }

    loadComments = () => {
        axios.get(`http://localhost:8080/comments/${this.props.ident}`).then((comments)=>{
            if (this.mounted) {
                this.setState({"comments": comments.data});
            }
        }).catch((error) => {
            console.log(`Loading root comments failed with ${error}`);
        });
    }

    render() {
        if (this.state.comments){
            return(
                <Container data-testid={'comments-tree'} className="container-fluid">
                    <h1> Комментарии: </h1>
                    <CommentChildren comments={this.state.comments}/>
                </Container>
            );
        } else {
            return (
                <div className={'flex-row'}>
                    <p className={'justify-content-center'}> Идет загрузка комментариев: </p>
                    <Spinner animation={'border'} className={'justify-content-center'}/>
                </div>);
        }

    }
}

export default CommentsTree;