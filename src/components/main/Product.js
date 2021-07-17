import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Counter from '../common/Counter';

const Product = (props) => {
	const classes = useStyles();

	const { product } = props;

	return (
		<div className={classes.root}>
			<img src={product.image_url} alt={product.product_name} className={classes.image} />
			<Typography className={classes.typography} align="center">
				<div className={classes.price}>R$ {product.price},69</div>

				<div className={classes.name}>{product.product_name}</div>

				<div className={classes.button}>
					<Counter product={product} />
				</div>
			</Typography>
		</div>
	);
};

export default Product;

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: '18%',
		border: `solid 1px ${theme.palette.divider}`, //CHANGE: THEME
		borderRadius: 4, //CHANGE: THEME
		padding: '20px 40px',
		margin: '15px 0px',
		'&:hover': {
			//boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.2)'
			border: 'solid 1px #aaa'
		}
	},
	image: {
		height: 140,
		borderRadius: 4
	},
	price: {
		fontSize: 18,
		fontWeight: 500,
		padding: '15px 0'
	},
	typography: {
		color: theme.palette.text.secondary
	},
	name: {
		margin: '10px 0',
		height: 24 * 3, //CHANGE: THEME, 24 tem q ser trocado
		textAlign: 'center'
	},
	button: {
		width: '100%'
	}
}));
