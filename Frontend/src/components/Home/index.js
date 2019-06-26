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
                        <Col><h1>Hi {user.firstName}!</h1>
                            <p>
                                <Link to="/login">Logout</Link>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/vegetables.jpg")} alt="Several Vegetables" />
                                <CardBody>
                                    <CardTitle>Product code scanning</CardTitle>
                                    <Button tag={Link} to="/productSearch">Scan your product here!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="6">
                            <div className="productDetailsDiv">
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


                            </div>
                        </Col>
                    </Row>
                </Container>
                <div>

                </div>
            </Jumbotron>
        )
    }
}