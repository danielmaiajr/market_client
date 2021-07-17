import React from 'react';

import MyButton from './MyButton';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { addItemsCart, subItemsCart } from '../../redux/actions/cartActions';

const Counter = (props) => {
	const { product, addItemsCart, subItemsCart } = props;
	const { cartItems } = props.cart;
	const classes = useStyles();

	const exist = cartItems.find((item) => item.product_id === product.product_id);

	const HandleSubItemsCart = (e) => {
		e.preventDefault();
		subItemsCart(product);
	};
	const HandleAddItemsCart = (e) => {
		e.preventDefault();
		addItemsCart(product);
	};

	return (
		<div className={classes.container}>
			{exist ? (
				<React.Fragment>
					<div className={classes.innerButtons}>
						<MyButton onClick={HandleSubItemsCart}>
							<RemoveIcon color="inherit" fontSize="small" />
						</MyButton>
					</div>

					<div className={classes.innerButtons}>{exist ? exist.quantity : 0}</div>

					<div className={classes.innerButtons}>
						<MyButton onClick={HandleAddItemsCart}>
							<AddIcon color="inherit" fontSize="small" />
						</MyButton>
					</div>
				</React.Fragment>
			) : (
				<MyButton onClick={HandleAddItemsCart}>Adicionar</MyButton>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

const mapDispatchToProps = {
	addItemsCart,
	subItemsCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		//border: `solid 1px ${theme.palette.divider}`,
		borderRadius: 3,
		width: '100%',
		height: 40
	},
	innerButtons: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
}));
