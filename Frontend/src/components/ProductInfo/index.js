// eslint-disable
import React from 'react';
import {
    Container, Row, Col, Button, Card, CardText, CardBody, CardImg,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem, Collapse
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import './styles.css';

const override = {
    marginLeft: '1rem',
    borderColor: 'red',
};

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
        const { productData, searchRecommendations, error, errorRecommendation, errorMessage, isLoadingRecommendation } = this.props;

        if (productData && !error) {
            return (
                <Container className="productInfo">
                    <Row>
                        <Col sm={{ size: 6, order: 1, offset: (errorRecommendation) ? 2 : 0 }}>
                            <h2>Product Info</h2>
                            <Card>
                                <CardImg style={{ maxHeight: 400 }} top width="100%" src={productData.img} alt={`Shows ${productData.name}`} />
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
                        {
                            (errorRecommendation) ?
                                null
                                :
                                <Col sm={{ size: 6, order: 1 }}>
                                    <h2>Recommended products</h2>
                                    {
                                        isLoadingRecommendation ?
                                            <ClipLoader
                                                css={override}
                                                sizeUnit={"px"}
                                                size={55}
                                                color={'#407899'}
                                                loading={isLoadingRecommendation}
                                            />
                                            :
                                            <div className="productRecommendation">
                                                {searchRecommendations.map((elem, i) => (
                                                    <Card key={'recommendation_' + i}>
                                                        <CardBody>
                                                            <CardTitle>{elem.name}<Button
                                                                onClick={() => this.props.handleGOPress(elem.upc)}
                                                                style={{
                                                                    float: 'right',
                                                                    backgroundColor: '#3C6020'
                                                                }}
                                                            >
                                                                Go!
                                                        </Button></CardTitle>
                                                            <div>
                                                                {this.getNutriscoreGrade(elem.nutritionGrade)}

                                                            </div>
                                                        </CardBody>
                                                    </Card>
                                                ))}
                                            </div>
                                    }
                                </Col>
                        }
                    </Row>
                    <Row>
                        <Col sm={{ size: 4, offset: (errorRecommendation) ? 2 : 0 }}>
                            <Button className="productDetailButton" onClick={this.toggleIngredients}>
                                See Ingredients {this.state.collapseIngredients ? <FaAngleUp /> : <FaAngleDown />}
                            </Button>
                            <Collapse isOpen={this.state.collapseIngredients}>
                                <div className="productDetailsDiv">
                                    <ListGroup>
                                        {
                                            productData.ingredients.length !== 0 ?
                                                productData.ingredients.map((ingredient, index) => {
                                                    return <ListGroupItem key={`ingridient_${index}`}>
                                                        {ingredient.text}
                                                    </ListGroupItem>
                                                })
                                                :
                                                <ListGroupItem key={`no_ingridient`}>
                                                    No ingridients provided
                                                </ListGroupItem>
                                        }

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
                                        {
                                            productData.nutrients.length !== 0 ?
                                                Object.entries(productData.nutrients).map((nutrient, index) => {
                                                    return <ListGroupItem key={`nutrient_${index}`}>
                                                        {`${nutrient[0]}: ${nutrient[1]}`}
                                                    </ListGroupItem>
                                                })
                                                :
                                                null
                                        }
                                    </ListGroup>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return <Row>
                <Col sm={{ size: 6, order: 1, offset: 2 }}>
                    <h3 style={{ marginTop: '20px' }}>{errorMessage}</h3>
                </Col>
            </Row>
        }
    }
}

export default ProductInfo;