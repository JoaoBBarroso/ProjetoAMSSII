// eslint-disable
import React from 'react';
import {
    Container, Row, Col, Button, Card, CardText, CardBody, CardImg,
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
        
        const { productData, searchRecommendations } = this.props
        if (productData) {
            return (
                <Container className="productInfo">
                    <Row>
                        <Col sm={{ size: 6, order: 1 }}>
                            <h2>Product Info</h2>
                            <Card>
                                <CardImg top width="100%" src={productData.img} alt={`Shows ${productData.name}`} />
                                <CardBody>
                                    <CardTitle>{productData.name}</CardTitle>
                                    <CardSubtitle>Code: {productData.upc}</CardSubtitle>
                                    <br />
                                    <CardText>The product's score is:</CardText>
                                    <div>
                                        {this.getNutriscoreGrade(productData.nutritionGrade)}
                                    </div>
                                </CardBody>
                            </Card>
                            <br />
                        </Col>
                        <Col sm={{ size: 6, order: 1 }}>
                            <h2>Recommended products</h2>
                            <div className="productRecommendation">
                                {
                                    searchRecommendations !== 0 ?
                                        searchRecommendations.map((elem, i) => (
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>{elem.name}</CardTitle>
                                                    <div>
                                                        {this.getNutriscoreGrade(elem.nutritionGrade)}
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))
                                        :
                                        <Card>
                                            <CardBody>
                                                <CardTitle>No recommendations</CardTitle>
                                                <CardSubtitle>Try your luck next time</CardSubtitle>
                                            </CardBody>
                                        </Card>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={{ size: 4 }}>
                            <Button className="productDetailButton" onClick={this.toggleIngredients}>
                                See Ingredients {this.state.collapseIngredients ? <FaAngleUp /> : <FaAngleDown />}
                            </Button>
                            <Collapse isOpen={this.state.collapseIngredients}>
                                <div className="productDetailsDiv">
                                    <ListGroup>
                                        {productData.ingredients.map((ingredient, index) => {
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
                                        {Object.entries(productData.nutrients).map((nutrient, index) => {
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