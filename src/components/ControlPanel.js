import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, ButtonGroup} from "react-bootstrap";

class ControlPanel extends React.Component {
    render() {
        return (
            <Container data-testid={'control-panel'} className={'container-fluid'}>
                <span className={'me-2'}> Сортировать по:</span>
                <ButtonGroup >
                    <Button variant="outline-secondary" onClick={this.props.sortByDate}>Дате</Button>
                    <Button variant="outline-secondary" onClick={this.props.sortByRating}>Рейтингу</Button>
                </ButtonGroup>
            </Container>
        );
    }
}

export default ControlPanel;