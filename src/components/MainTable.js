import React from 'react';
import {Container, Spinner, Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

class MainTable extends React.Component {
    constructor(props) {
        super(props);
    }

    setStories(stories) {
        if (stories.length !== 0) {
            let table = [];
            for (let i = 0; i < stories.length; i++) {
                let date = new Date(+stories[i].time * 1000).toLocaleString();
                table.push(
                    <tr key={stories[i].id}>
                        <td>{i + 1}</td>
                        <td> <Link to={`/article/${stories[i].id}`}>{stories[i].title}</Link> </td>
                        <td>{stories[i].by}</td>
                        <td> {stories[i].score} </td>
                        <td> {date} </td>
                    </tr>
                )
            }
            return (
                <Table striped bordered hover className={'mt-3'}>
                    <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Рейтинг</th>
                        <th>Дата публикации</th>
                    </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </Table>);
        } else {
            return (
                <div className={'flex-row'}>
                    <p className={'justify-content-center'}> Идет загрузка таблицы: </p>
                    <Spinner animation={'border'} className={'justify-content-center'}/>
                </div>);
        }
    }

    render(){
        return(
            <Container className="container-fluid">
                {this.setStories(this.props.stories)}
            </Container>
        )
    }
}

export default MainTable;