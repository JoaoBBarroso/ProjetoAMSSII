import React from 'react';
import ProductSearch from '../../components/ProductSearch';
import ProductInfo from '../../components/ProductInfo';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getTest,
} from '../../Redux/Product';


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

    componentDidMount = () => {
        console.log(this.props.data)
    }

    handleChange = (e) => {

        this.props.getTest();
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = (e) => {
        let that = this;
        this.props.getTest();

        // let value = e.target.value;
        let value = 737628064502;
        fetch(`http://localhost:3001/api/food/${value}`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (productData) {
                console.log(productData)
                that.setState({ productData })
            });

        this.setState({ loading: true, error: "your product doesn't exist" });
        // e.preventDefault();

        // this.setState({ submitted: true });
        // const { username, password, returnUrl } = this.state;

        // // stop here if form is invalid
        // if (!(username && password)) {
        //     return;
        // }

        // this.setState({ loading: true });
        // userService.login(username, password)
        //     .then(
        //         user => {
        //             const { from } = this.props.location.state || { from: { pathname: "/" } };
        //             this.props.history.push(from);
        //         },
        //         error => this.setState({ error, loading: false })
        //     );
    }

    render() {
        const { currentSearch, submitted, error } = this.state;
        console.log(this.state.productData)
        return (
            <div>
                <ProductSearch

                    //state
                    currentSearch={currentSearch}
                    submitted={submitted}
                    error={error}

                    //functions
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
                <ProductInfo
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
        getTest: () => dispatch(getTest())

    }
}


export default withRouter(connect(mapPropsToState, mapDispatchToState)(ProductPage));