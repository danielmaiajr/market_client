import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

import Search from './Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { changeShowCart } from '../../redux/actions/cartActions';
import styled from 'styled-components';

import image_test from './IMG-20201009-WA0049.jpg';

const LowerNav = (props) => {
	const { logoutUser, history } = props;
	const { user } = props;
	const [ anchorEl, setAnchorEl ] = useState(false);

	const { changeShowCart } = props;
	const { cartItems } = props.cart;

	let sum = 0;
	cartItems.forEach((n) => {
		sum += n.quantity;
	});
	const num = sum === 0 ? null : sum;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(false);
	};

	return (
		<React.Fragment>
			<BottomWrapper />
			<Wrapper>
				<MenuButton>
					<MenuIcon />
				</MenuButton>
				<Link to="/home" style={{ color: 'white' }}>
					<img src={image_test} alt="this is car" style={{ height: 100 }} />
				</Link>
				<DisplayMax>
					<Search />
				</DisplayMax>

				<div style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
					<CartButtom onClick={handleClick}>
						<AccountCircleIcon />
					</CartButtom>
					<DisplayMax>Olá, {user.name} </DisplayMax>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem
							onClick={() => {
								history.push('/minha-conta');
								setAnchorEl(false);
							}}
						>
							Minha Conta
						</MenuItem>
						<MenuItem onClick={() => logoutUser(history)}>Logout</MenuItem>
					</Menu>
					<CartButtom onClick={changeShowCart}>
						<Badge badgeContent={num} color="primary">
							<ShoppingCartIcon />
						</Badge>
					</CartButtom>
				</div>

				<DisplayMin style={{ width: '100%' }}>
					<Search />
				</DisplayMin>
			</Wrapper>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	cart: state.cart
});

const mapDispatchToProps = { changeShowCart, logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LowerNav));

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	z-index: 1;
	top: 0;
	width: 100%;
	height: 100px;
	padding: 0 60px;
	background-color: var(--main-bg-color);
	@media (max-width: 1050px) {
		height: 120px;
		padding: 10px 20px;
	}
`;

const BottomWrapper = styled.div`
	width: 100%;
	height: 100px;
	@media (max-width: 1050px) {
		height: 120px;
	}
`;

const CartButtom = styled.div`
	box-sizing: border-box;
	color: black;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	padding: 0 10px;
	margin-left: 10px;
	&:hover {
		background-color: rgb(255, 255, 255, 0.1);
		border-radius: 3px;
		cursor: pointer;
	}
`;

const MenuButton = styled.div`
	box-sizing: border-box;
	color: black;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	padding: 0 10px;
	&:hover {
		background-color: rgb(255, 255, 255, 0.1);
		border-radius: 3px;
		cursor: pointer;
	}
	@media (min-width: 1050px) {
		display: none;
	}
`;

const DisplayMin = styled.div`@media (min-width: 1050px) {display: none;}`;

const DisplayMax = styled.div`@media (max-width: 1050px) {display: none;}`;
