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
            currentSearch: null,
            submitted: '',
            loading: false,
            error: '',
            errorMessage: '',
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = async () => {
        if(this.state.currentSearch && this.state.currentSearch !== "" && this.state.currentSearch !== " " ){
            this.props.searchProduct(this.state.currentSearch);
        } else {
            this.setState({ errorMessage: 'Please search for another product!' });
        }
        
    }

    handleGOPress = async (upc) => {
        this.props.searchProduct(upc);
    }

    render() {
        const { productData, isLoading, error, errorRecommendation, searchRecommendations, isLoadingRecommendation} = this.props;
        const { currentSearch, submitted, errorMessage } = this.state;
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
                    error={error}
                    isLoadingRecommendation={isLoadingRecommendation}
                    errorRecommendation={errorRecommendation}
                    errorMessage={errorMessage}
                    handleGOPress={this.handleGOPress}
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
        isLoadingRecommendation,
        error,
        errorRecommendation } = state.product;
    return {
        productData,
        searchRecommendations,
        isLoaded,
        isLoading,
        isLoadingRecommendation,
        error,
        errorRecommendation
        
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        searchProduct: (upc) => dispatch(searchProduct(upc))
    }
}

export default withRouter(connect(mapPropsToState, mapDispatchToState)(ProductPage));