import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"comments": [], "open": false}
        this.mounted = true;
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/comment`,
            {params: {
                        ids: this.props.comment.kids
                    }
            }).then((comments)=>{
                if (this.mounted) {
                    this.setState({"comments": comments.data});
                }
            }).catch((error) => {
                console.log(`Loading comments failed with ${error}`);
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render(){
        let comment = this.props.comment;
        if (comment) {
            return (
                <li key={comment.id}>
                    <span>Пользователь {comment.by} пишет: </span>
                    <div dangerouslySetInnerHTML={{__html: comment.text}}/>
                    <CommentChildren comments={this.state.comments}/>
                </li>
            )
        } else {
            return null;
        }
    }
}

class CommentChildren extends React.Component {
    render(){
        if (this.props.comments) {
            return (
                <ul>
                    {this.props.comments.map(function (comment) {
                        return <Comment comment={comment}/>
                    })}
                </ul>);
        } else {
            return null;
        }
    }
}

export {Comment, CommentChildren};