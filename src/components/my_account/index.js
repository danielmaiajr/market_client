import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './index.css';

import Orders from './Orders';
import Profile from './profile';
import Sidebar from './Sidebar';
import Address from './address';

class MyAccount extends Component {
	render() {
		return (
			<div className="account">
				<Sidebar />
				<Switch>
					<Route exact path="/minha-conta" component={Profile} />
					<Route exact path="/meus-enderecos" component={Address} />
					<Route exact path="/meus-pedidos" component={Orders} />
				</Switch>
			</div>
		);
	}
}

export default MyAccount;
