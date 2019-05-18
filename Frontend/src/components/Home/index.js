import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import {
    Jumbotron, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row,
    Col
} from 'reactstrap';


export default class Home extends React.Component {

    render() {
        return (
            <Jumbotron className="justify-content-center">
                <Container>
                    <Row>
                        <Col><h1>Hi {this.props.user.firstName}!</h1>
                            <p>You're logged in with React & Basic HTTP Authentication!!</p>
                            <h3>Users from secure api end point:</h3>
                            {(this.props.users.loading !== null ? this.props.users.loading : null) && <em>Loading users...</em>}
                            {this.props.users.length &&
                                <ul>
                                    {this.props.users.map((user, index) =>
                                        <li key={user.id}>
                                            {user.firstName + ' ' + user.lastName}
                                        </li>
                                    )}
                                </ul>
                            }
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
                            <Card>
                                <CardImg className="cardImage" top src={require("../../images/nutricionist.jpg")} alt="Nutricionist with vegetables and fruit" />
                                <CardBody>
                                    <CardTitle>Nutricionists have gathered the healthiest foods</CardTitle>
                                    <Button tag={Link} to="/">Consult our suggestions!</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div>

                </div>
            </Jumbotron>
        )
    }
}