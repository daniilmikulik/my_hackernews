import React from "react";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class AppNavbar extends React.Component {
    setReload(){
        if (this.props.load){
            return (
                <Navbar.Collapse className="justify-content-end">
                    <Button data-testid="nav-button" onClick={this.props.load}> Перезагрузить </Button>
                </Navbar.Collapse>
            );
        } else {
            return (
                <Navbar.Collapse className="justify-content-end">
                    <Button data-testid="nav-button" href={'/'} > Назад </Button>
                </Navbar.Collapse>
            );
        }
    }
    render() {
        return (
        <>
            <Navbar data-testid={"app-navbar"} bg="dark" variant="dark" expand={'lg'} className={'fixed-top'}>
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