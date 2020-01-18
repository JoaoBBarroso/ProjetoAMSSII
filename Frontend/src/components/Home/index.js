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
                        <h1>Welcome to Nutrieat - healthy eating</h1>
                        <h3>Our goal is to help you becoming healthier.</h3>
                    </Row>
                    <Row>
                        <span>Through our website you will find several pages where you can</span>
                        <ul>
                            <li>Search any product by its UPC code and get the nutritional value through nutri-score</li>
                            <li>Get tips and other info about how to eat healthier and have a better lifestyle</li>
                        </ul>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/eating.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>Having doubts about your product?</CardTitle>
                                    <Button className={'searchButton'} tag={Link} to="/upc-product-search">Scan your product!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6">
                        <Card>
                                <CardImg className="cardImage" top src={require("../../images/food.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>I don't know where to start</CardTitle>
                                    <Button className={'searchButton'} tag={Link} to="/healthy-tips">Check some tips!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/healthy.jpg")} alt="Several Vegetables" />
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