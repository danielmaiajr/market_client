import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { Pagination } from '@material-ui/lab';

import Product from './Product';
import Footer from './Footer';

import { getProduct } from '../../redux/actions/productActions';

const Section = (props) => {
	const { products, name, getProduct } = props;
	const { path } = props.match;

	useEffect(
		() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			getProduct(path, 1);
		},
		[ getProduct, path ]
	);
	const [ page, setPage ] = useState(1);
	const classes = useStyles();

	const handleChange = (event, value) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		getProduct(path, value);
		setPage(value);
	};

	return (
		<React.Fragment>
			<div className={classes.content}>
				<h1 className={classes.title}>{name}</h1>
				<Divider />
				<div className={classes.products}>
					{products.map((product) => <Product key={product.product_id} product={product} />)}
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
					<Pagination count={10} page={page} onChange={handleChange} />
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	products: state.product
});

export default connect(mapStateToProps, { getProduct })(withRouter(Section));

const useStyles = makeStyles({
	content: {
		color: '#555',
		paddingTop: '20px',
		width: '70%',
		margin: '10px auto'
	},

	title: {
		fontWeight: 500,
		fontSize: '20px'
	},
	products: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	}
});
