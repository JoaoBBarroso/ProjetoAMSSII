import React from 'react';
import ProductSearch from '../../components/ProductSearch';
import ProductInfo from '../../components/ProductInfo';
import { searchProduct } from '../../Redux/Product';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            submitted: '',
            loading: false,
            error: ''
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = () => {
        let that = this;
        this.setState({ loading: true });

        this.props.searchProduct(this.state.currentSearch);
    }

    render() {
        const { productData } = this.props;
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
                    productData={productData}
                />
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    var { productData } = state.product;
    return {
        productData: productData,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        searchProduct: (upc) => dispatch(searchProduct(upc))
    }
}

export default withRouter(connect(mapPropsToState, mapDispatchToState)(ProductPage));