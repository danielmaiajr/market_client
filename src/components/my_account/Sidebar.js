import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export class Sidebar extends Component {
	render() {
		return (
			<div>
				<div className="sidebar-under" />
				<div className="sidebar">
					<ul className="sidebar-container">
						<li className="sidebar-item">
							<NavLink to="/minha-conta" activeClassName="sidebar-item-active" className="link-color">
								<div className="icon">
									<i className="fa fa-user-o" aria-hidden="true" />
								</div>
								&nbsp;Cadastro
							</NavLink>
						</li>
						<li className="sidebar-item">
							<NavLink to="/meus-enderecos" activeClassName="sidebar-item-active" className="link-color">
								<div className="icon">
									<i className="fa fa-map-marker" aria-hidden="true" />
								</div>
								&nbsp;Meus Endereços
							</NavLink>
						</li>
						<li className="sidebar-item">
							<NavLink to="/meus-pedidos" activeClassName="sidebar-item-active" className="link-color">
								<div className="icon">
									<i className="fa fa-calendar-check-o" aria-hidden="true" />
								</div>
								&nbsp;Meus Pedidos
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
