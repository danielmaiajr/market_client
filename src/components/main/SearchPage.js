import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, useLocation } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import { Pagination } from '@material-ui/lab';

import Product from './Product';
import Footer from './Footer';

import { getSearchPageResults } from '../../redux/actions/searchActions';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const SearchPage = (props) => {
	const { searchPage, getSearchPageResults } = props;
	let query = useQuery().get('value');

	useEffect(
		() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			getSearchPageResults(query, 1);
		},
		[ getSearchPageResults, query ]
	);
	const [ page, setPage ] = useState(1);
	const classes = useStyles();

	const handleChange = (event, value) => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		getSearchPageResults(query, value);
		setPage(value);
	};

	return (
		<React.Fragment>
			<div className={classes.content}>
				<h1 className={classes.title}>Pesquisa: {query}</h1>
				<Divider />
				<div className={classes.products}>
					{searchPage.map((product) => <Product key={product.product_id} product={product} />)}
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
	searchPage: state.search.searchPage
});

export default connect(mapStateToProps, { getSearchPageResults })(withRouter(SearchPage));

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
