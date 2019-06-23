// eslint-disable
import React from 'react';
import {
    Container, Row, Col, Button, Card, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem, Collapse
} from 'reactstrap';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import './styles.css';

class ProductInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productData: this.props.productData || undefined,
            collapseIngredients: false,
            collapseNutrients: false
        };
    }

    toggleIngredients = () => {
        this.setState(state => ({ collapseIngredients: !state.collapseIngredients }));
    }
    toggleNutrients = () => {
        this.setState(state => ({ collapseNutrients: !state.collapseNutrients }));
    }

    getNutriscoreGrade = (grade) => {
        if (grade !== undefined) {
            let uppercaseGrade = grade.toUpperCase();
            return <img alt={`Grade ${uppercaseGrade}.`} src={require(`./nutri-score/nutriscore${uppercaseGrade}.png`)}></img>
        } else {
            return <p>N/D</p>
        }
    }

    render() {
        console.log(this.props.productData)
        // console.log(this.props.productData !== undefined && Object.entries(this.props.productData).length !== 0 && this.props.productData.constructor === Object)
        if (this.props.productData) {
            return (
                <Container className="productInfo">
                    <Row>
                        <Col sm={{ size: 6, order: 1, offset: 2 }}>
                            <h2>Product Info</h2>
                            <Card>
                                <CardBody>
                                    <div style={{ float: "right" }}>
                                        <img className="cardImage" alt={`Shows ${this.props.productData.brand}`} src={this.props.productData.img}></img>
                                    </div>
                                    <CardTitle>{this.props.productData.brand}</CardTitle>
                                    <CardSubtitle>Code: {this.props.productData.id}</CardSubtitle>
                                    <br />
                                    <CardText>The product's score is:</CardText>
                                    <div>
                                        {this.getNutriscoreGrade(this.props.productData.nutritionGrade)}
                                    </div>
                                </CardBody>
                            </Card>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 4, offset: 2 }}>
                            <Button className="productDetailButton" onClick={this.toggleIngredients}>
                                See Ingredients {this.state.collapseIngredients ? <FaAngleUp /> : <FaAngleDown />}
                            </Button>
                            <Collapse isOpen={this.state.collapseIngredients}>
                                <div className="productDetailsDiv">
                                    <ListGroup>
                                        {this.props.productData.ingredients.map((ingredient, index) => {
                                            return <ListGroupItem key={`ingridient_${index}`}>
                                                {ingredient.text}
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </div>
                            </Collapse>
                        </Col>
                        <Col sm={{ size: 4, offset: 0 }}>
                            <Button className="productDetailButton" onClick={this.toggleNutrients}>
                                See Nutrients {this.state.collapseNutrients ? <FaAngleUp /> : <FaAngleDown />}
                            </Button>
                            <Collapse isOpen={this.state.collapseNutrients}>
                                <div className="productDetailsDiv">
                                    <ListGroup>
                                        {Object.entries(this.props.productData.nutrients).map((nutrient, index) => {
                                            return <ListGroupItem key={`nutrient_${index}`}>
                                                {`${nutrient[0]}: ${nutrient[1]}`}
                                            </ListGroupItem>
                                        })}
                                    </ListGroup>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return null;
        }
    }
}

export default ProductInfo;