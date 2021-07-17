import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Counter from '../common/Counter';

import './cart.css';

export const CartItem = (props) => {
	const { product } = props;
	const classes = useStyles();

	return (
		<div className={classes.cartItem}>
			<img src={product.image_url} alt={product.product_name} className={classes.cartImage} />
			<div className={classes.cartItemContainer}>
				<div className={classes.cartProductName}>{product.product_name}</div>
				<div className={classes.cartProductButton}>
					<div className={classes.cartProductPrice}>R$ {product.price}</div>
					<div className={classes.cartProductCounter}>
						<Counter product={product} css="cart" />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

const useStyles = makeStyles({
	cartItem: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px 15px',
		padding: 10,
		backgroundColor: '#FFF',
		border: '1px solid #ddd',
		borderRadius: 3,
		'&:hover': {
			border: 'solid 1px #aaa'
		}
	},

	cartImage: {
		width: 60,
		height: 60
	},

	cartItemContainer: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		paddingLeft: 20,
		margin: '0px 10px',
		borderLeft: '1px solid #ddd'
	},
	cartProductName: {
		height: 44,
		color: '#555'
	},
	cartProductButton: {
		display: 'flex',
		justifyContent: 'space-between'
	},

	cartProductPrice: {
		display: 'flex',
		flex: 1,
		color: '#111',
		alignSelf: 'center',
		justifyContent: 'flex-start',
		fontWeight: '500'
	},
	cartProductCounter: {
		width: '60%'
	}
});
