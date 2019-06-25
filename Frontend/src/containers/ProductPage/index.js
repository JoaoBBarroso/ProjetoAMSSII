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
            error: '',
            // productData: null
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = async () => {
        this.props.searchProduct(this.state.currentSearch);
    }

    render() {
        const { productData, isLoading, error, searchRecommendations} = this.props;
        const { currentSearch, submitted } = this.state;
        return (
            <div>
                <ProductSearch

                    //state
                    currentSearch={currentSearch}
                    submitted={submitted}
                    error={error}
                    loading={isLoading}

                    //functions
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <ProductInfo

                    //state
                    productData={productData}
                    searchRecommendations={searchRecommendations}
                />
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    var { productData,
        searchRecommendations,
        isLoaded,
        isLoading,
        error } = state.product;
    return {
        productData,
        searchRecommendations,
        isLoaded,
        isLoading,
        error
        
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        searchProduct: (upc) => dispatch(searchProduct(upc))
    }
}

export default withRouter(connect(mapPropsToState, mapDispatchToState)(ProductPage));