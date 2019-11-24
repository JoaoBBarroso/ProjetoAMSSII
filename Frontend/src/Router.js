import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Layout from './components/Layout';
import HomePage from './containers/HomePage';
// import LoginPage from './containers/LoginPage';
import ProductPage from './containers/ProductPage';
// import { PrivateRoute } from './PrivateRoute';


export default class Router extends Component {

    getRoutes() {
        var routes = [
            {
                to: `${process.env.PUBLIC_URL}/`,
                exact: true,
                label: 'Homepage',
                title: 'App',
                hide: true
            },
            {
                to: `${process.env.PUBLIC_URL}/productSearch`,
                label: 'Product Search',
                title: 'ProductSearch'
            },
        ]
        return routes;
    }
    render() {
        var routes = this.getRoutes();
        return (
            <div id="contents" style={{backgroundColor: "#f7f7f7", height: '100%' }}>
                <Menu routes={routes} />
                <Layout>
                    <Switch>
                        {/* <Route exact path="/login" component={LoginPage} /> */}
                        {/* Private Routes for logged-in users */}
                        <Route exact path={`/`} component={HomePage} /> 
                        {/* <PrivateRoute exact path={`/`} component={HomePage} />  */}
                        <Route exact path="/productSearch" component={ProductPage} />
                        <Route exact path="/healthy-tips" component={ProductPage} />
                        <Route exact path="/about" component={ProductPage} />
                        {/* <PrivateRoute exact path="/productSearch" component={ProductPage} /> */}
                    </Switch>
                </Layout>
                <Footer />
            </div>
        )
    }
}