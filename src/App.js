import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { navRoutes } from './routes/navRoutes';

import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';
import Begin from './components/Begin';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/navbar/Navbar';
import Cart from './components/cart/Cart';
import Main from './components/main/Main';
import Section from './components/main/Section';
import SearchPage from './components/main/SearchPage';
import MyAccount from './components/my_account';
import Checkout from './components/checkout/Checkout';
import PrivateRoute from './components/private/PrivateRoute';
import Private from './components/private/Private';
import LoadCart from './components/LoadCart';

import { loginCheck } from './utils/loginCheck';

loginCheck();

const App = () => {
	const classes = useStyles();

	return (
		<Provider store={store}>
			<div className={classes.app}>
				<Router>
					<Private component={Navbar} />
					<Private component={Cart} />
					<Private component={LoadCart} />
					<Switch>
						<Route exact path="/" component={Begin} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<PrivateRoute exact path="/home" component={Main} />
						{navRoutes.map((route, i) => (
							<PrivateRoute exact path={route.path} key={i} component={Section} name={route.name} />
						))}
						<PrivateRoute exact path="/search" component={SearchPage} />
						<PrivateRoute exact path="/minha-conta" component={MyAccount} />
						<PrivateRoute exact path="/meus-enderecos" component={MyAccount} />
						<PrivateRoute exact path="/meus-pedidos" component={MyAccount} />
						<PrivateRoute exact path="/checkout" component={Checkout} />
						<Route path="*" render={() => <Redirect to="/404" />} />
					</Switch>
				</Router>
			</div>
		</Provider>
	);
};

export default App;

const useStyles = makeStyles((theme) => ({
	app: {
		backgroundColor: theme.palette.background.default
	}
}));
