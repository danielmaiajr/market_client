import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AlertDialog from '../AlertDialog';

import { connect } from 'react-redux';
import { changeShowCart, deleteItemsCart } from '../../redux/actions/cartActions';
import { getCartItems } from '../../redux/actions/cartActions';
import './cart.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartItem from './CartItem';

const Cart = (props) => {
	const { cartItems, showCart } = props.cart;
	const { changeShowCart, deleteItemsCart, getCartItems } = props;

	const [ openDialog, setOpenDialog ] = useState(false);

	useEffect(
		() => {
			console.log('Renderizando o carrinho');
			getCartItems();
		},
		[ showCart, getCartItems ]
	);

	let cartClasses = 'cart';
	let backGroundClasses = 'backgound';
	if (showCart) {
		cartClasses = 'cart open';
		backGroundClasses = 'background open';
	}
	let num = 0;
	if (cartItems.length > 0) {
		cartItems.forEach((n) => {
			num += n.quantity * n.price;
		});
	}

	const onDelete = () => {
		deleteItemsCart();
	};

	return (
		<React.Fragment>
			<AlertDialog open={openDialog} handleClose={setOpenDialog} HandleAgree={onDelete}>
				Remover todos os itens do carrinho?
			</AlertDialog>
			<div className={backGroundClasses} onClick={changeShowCart} />
			<div className={cartClasses}>
				<div className="cart-title">
					<button onClick={changeShowCart} className="cart-title-close">
						x Fechar
					</button>
					<ShoppingCartIcon className="cart-title-name" />
				</div>
				<div className="cart-delete">
					{cartItems.length > 0 ? (
						<div className="cart-delete-icon" onClick={(e) => setOpenDialog(true)}>
							<DeleteForeverIcon />LIMPAR
						</div>
					) : null}
				</div>
				<div className="cart-scroll">{cartItems.map((item, i) => <CartItem key={i} product={item} />)}</div>
				<div className="cart-checkout">
					<div className="cart-checkout-total">Total: R$ {num}</div>
					<Link to="/checkout" onClick={changeShowCart} className="cart-checkout-button">
						Finalizar
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps, { changeShowCart, deleteItemsCart, getCartItems })(Cart);
