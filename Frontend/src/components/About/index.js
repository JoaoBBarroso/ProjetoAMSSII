import React from 'react';
import {
    Jumbotron, Container, Row, Col
} from 'reactstrap';


export default class About extends React.Component {
    render() {
        return (
            <Jumbotron className="justify-content-center">
                <Container>
                    <Row>
                        <Col xs="12">
                            <h1>This is NUTREAT</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" style={{ fontWeight: "bold", color: "#FF0000" }}>
                            Disclaimer! This website was made for simple academy purposes.
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            With a website like this the goal is to help people reach higher standarts of healthy eating.
                            <br />
                            By providing a scanning tool and some useful tips we hope to achieve just that.
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}