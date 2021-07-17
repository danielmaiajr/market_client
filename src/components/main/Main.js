import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { navRoutes } from '../../routes/navRoutes';

import Product from './Product';
import Images from './Images';

import { getProduct } from '../../redux/actions/productActions';

const Main = (props) => {
	const { getProduct } = props;
	useEffect(
		() => {
			getProduct('');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		[ getProduct ]
	);

	const { products } = props;
	const classes = useStyles();

	return (
		<React.Fragment>
			<Images />

			<div className={classes.content}>
				{navRoutes.map((route, i) => (
					<div key={i}>
						<h1 className={classes.title}>{route.name}</h1>

						{/* <Link to={route.path} className={classes.link}>
							Ver mais
						</Link> */}

						<div className={classes.products}>
							{products.map(
								(product) =>
									route.route === product.section ? (
										<Product key={product.product_id} product={product} />
									) : null
							)}
						</div>
					</div>
				))}
			</div>
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	products: state.product
});

export default connect(mapStateToProps, { getProduct })(Main);

const useStyles = makeStyles({
	content: {
		color: '#555',
		paddingTop: '20px',
		width: '70%',
		margin: '10px auto'
	},

	title: {
		fontWeight: 550,
		fontSize: '24px'
	},
	link: {
		color: '#aaa'
	},
	products: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	}
});
