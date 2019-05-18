import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './styles.css';

class ProductSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.error !== undefined
        };
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        return (
            <Container className="productSearch">
                <Row>
                    <Col sm={{ size: 6, order: 2, offset: 2 }}>
                        <h2>Barcode Search</h2>
                        <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="currentSearch" className="mr-sm-2">Enter the barcode number</Label>
                                <Input type="text" name="currentSearch" id="currentSearch" placeholder="1 234567 890123" />
                            </FormGroup>
                            <Button onClick={this.props.handleSubmit}>Search</Button>
                        </Form>
                    </Col>
                    <Col sm={{ size: 6, order: 2, offset: 2 }}>
                        {this.props.error &&
                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                {this.props.error}
                            </Alert>
                        }
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default ProductSearch;