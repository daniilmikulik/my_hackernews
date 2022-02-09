import React from 'react';
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class MainDescription extends React.Component {
    render(){
        return (
                <Container data-testid={'main-description'} className="container-fluid">
                    <h1>
                        Hacker News
                    </h1>
                    <p>
                        Ниже отображены последние 100 новостей из мира IT на текущий момент:
                    </p>
                </Container>
        );
    }
}

export default MainDescription;