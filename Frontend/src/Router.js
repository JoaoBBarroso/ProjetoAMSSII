import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Header from './Components/Header';
// import Footer from './Components/Footer';

// import ProtectedRoute from './Containers/ProtectedRoute';

// import { PrivateRoute } from './PrivateRoute';
import Layout from './components/Layout';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';


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
                to: `${process.env.PUBLIC_URL}/login`,
                label: 'Reviewers Events Table',
                title: 'Login'
            },
        ]
        return routes;
    }
    render() {
        // var routes = this.getRoutes();
        return (
            <div>
                {/* <Header routes={routes} /> */}
                <Layout>
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} render={props => (
                            <HomePage />
                        )} />
                        <Route exact path={`${process.env.PUBLIC_URL}/login`} render={props => (
                            <LoginPage />
                        )} />
                        {/* <Route exact path={`${process.env.PUBLIC_URL}/`} render={props => (
                            <ProtectedRoute userRole={['administrator']}>
                                <Homepage routes={routes} />
                            </ProtectedRoute>
                        )} />
                        <Route exact path={`${process.env.PUBLIC_URL}/error`} render={props => (
                            <ErrorPage />
                        )} />
                        <Route exact path={`${process.env.PUBLIC_URL}/forbidden`} render={props => (
                            <ForbiddenPage />
                        )} />
                        <Route render={props => (
                            <PageNotFound />
                        )} /> */} 
                    </Switch>
                </Layout>
                {/* <Footer /> */}
            </div>
        )
    }
}

// <Switch>
//               <PrivateRoute exact path="/" component={HomePage} />
//               <Route path="/login" component={LoginPage} />
//             </Switch>