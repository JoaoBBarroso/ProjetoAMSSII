import React from 'react';
import ProductSearch from '../../components/ProductSearch';
import ProductInfo from '../../components/ProductInfo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            submitted: '',
            loading: false,
            error: '',
            productData: {}
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = () => {
        let that = this;
        this.setState({ loading: true });

        console.log(`http://localhost:3001/api/food/${this.state.currentSearch}`)
        fetch(`http://localhost:3001/api/food/${this.state.currentSearch}`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (productData) {
                console.log(productData);
                that.setState({ productData, loading: false })
            }).catch(function (err) {
                that.setState({ loading: false, error: "your product doesn't exist" });
            });
    }

    render() {
        const { currentSearch, submitted, error, loading } = this.state;
        return (
            <div>
                <ProductSearch

                    //state
                    currentSearch={currentSearch}
                    submitted={submitted}
                    error={error}
                    loading={loading}

                    //functions
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <ProductInfo

                    //state
                    productData={this.state.productData}
                />
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    var { data } = state.product;
    // var user = state.user;
    return {
        // user: user.user,
        data: data,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        // getTest: () => dispatch(getTest())
    }
}

export default withRouter(connect(mapPropsToState, mapDispatchToState)(ProductPage));