import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';



// import ProtectedRoute from './Containers/ProtectedRoute';
// import { PrivateRoute } from './PrivateRoute';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Layout from './components/Layout';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import ProductPage from './containers/ProductPage';
import { PrivateRoute } from './PrivateRoute';


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
            <div id="contents" style={{backgroundColor: "#f7f7f7", }}>
                <Menu routes={routes} />
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        {/* Private Routes for logged-in users */}
                        <PrivateRoute exact path={`/`} component={HomePage} /> 
                        <PrivateRoute exact path="/productSearch" component={ProductPage} />
                        {/* <Route exact path={`${process.env.PUBLIC_URL}/`} render={props => (
                            <ProtectedRoute userRole={['administrator']}>
                                <Homepage routes={routes} />
                            </ProtectedRoute>
                        )} />
                        <Route exact path={`${process.env.PUBLIC_URL}/error`} render={props => (
                            <ErrorPage />
                        )} /> */}
                    </Switch>
                </Layout>
                <Footer />
            </div>
        )
    }
}

// <Switch>
//   <PrivateRoute exact path="/" component={HomePage} />
//   <Route path="/login" component={LoginPage} />
// </Switch>