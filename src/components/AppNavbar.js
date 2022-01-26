import React from "react";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class AppNavbar extends React.Component {
    setReload(){
        if (this.props.load){
            return (
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={this.props.load}> Перезагрузить </Button>
                </Navbar.Collapse>
            );
        } else {
            return (
                <Navbar.Collapse className="justify-content-end">
                    <Button href={'/'} > Назад </Button>
                </Navbar.Collapse>
            );
        }
    }
    render() {
        return (
        <>
            <Navbar bg="dark" variant="dark" expand={'lg'}>
                <Container>
                    <Navbar.Brand href="/">Hacker News</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className="me-3">Наверх</Nav.Link>
                    </Nav>
                    {this.setReload()}
                </Container>
            </Navbar>
        </>
        )
    }
}

export default AppNavbar;