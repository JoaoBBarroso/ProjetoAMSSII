import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import {
    Jumbotron, Card, CardImg, CardBody,
    CardTitle, ListGroup, ListGroupItem, Button, Container, Row,
    Col
} from 'reactstrap';


export default class Home extends React.Component {

    render() {

        const { user, searchHistory } = this.props;

        return (
            <Jumbotron className="justify-content-center">
                <Container>
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/vegetables.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>Product code scanning</CardTitle>
                                    <Button className={'searchButton'} tag={Link} to="/productSearch">Scan your product here!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6">
                        <Card>
                                <CardImg className="cardImage" top src={require("../../images/vegetables.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>I don't know where to start</CardTitle>
                                    <Button className={'searchButton'} tag={Link} to="/healthy-tips">Here are some tips!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/vegetables.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>About this simple website</CardTitle>
                                    <Button className={'searchButton'} tag={Link} to="/about">Who is this for</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6"><div className="productDetailsDiv">
                            {
                                searchHistory.length !== 0 ?
                                    <ListGroup>
                                        {
                                            searchHistory.map((elem, i) => (
                                                <ListGroupItem key={`searchItem${i}`}>
                                                    {elem.name}
                                                </ListGroupItem>
                                            ))
                                        }
                                    </ListGroup>

                                    :
                                    <div>
                                        There are currently no items on search history.
                                            <ListGroup>
                                            <ListGroupItem key={`noItems`}>
                                                Search for an item!
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                            }


                        </div></Col>
                    </Row>
                </Container>
                <div>

                </div>
            </Jumbotron>
        )
    }
}