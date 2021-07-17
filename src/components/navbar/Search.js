import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartItem from '../cart/CartItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './Search.css';

import { getSearchNavResults } from '../../redux/actions/searchActions';

const CssTextField = withStyles({
	root: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		width: '100%',
		borderRadius: 3,
		'& label.Mui-focused': {
			color: 'black'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'rgba(0, 0, 0, 0.1)'
		},
		'& .MuiOutlinedInput-root': {
			color: 'black',
			'& fieldset': {
				borderColor: 'rgba(0, 0, 0, 0.1)'
			},
			'&:hover fieldset': {
				borderColor: 'rgba(0, 0, 0, 0.1)'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'rgba(0, 0, 0, 0.1)'
			}
		}
	}
})(TextField);

const Search = (props) => {
	const { searchResult, getSearchNavResults } = props;
	const [ showSearch, setShowSearch ] = useState(false);
	const [ searchValue, setSearchValue ] = useState('');

	useEffect(() => (searchResult.length > 0 ? setShowSearch(true) : setShowSearch(false)), [ searchResult ]);

	const searchResultsClass = showSearch ? 'search-result open' : 'search-result';
	const searchBackGround = showSearch ? 'search-background open' : 'search-background';

	const HandleOnChange = (e) => {
		console.log('test');
		e.preventDefault();
		setSearchValue(e.target.value);
		getSearchNavResults(e.target.value);
	};

	const HandleOnSubmit = (e) => {
		e.preventDefault();
		props.history.push(`/search?value=${searchValue}`);
		setShowSearch(false);
	};

	return (
		<form className="search-form" onSubmit={(e) => HandleOnSubmit(e)}>
			<div className={searchBackGround} onClick={() => setShowSearch(false)} />

			<CssTextField
				className="search-input"
				placeholder="Pesquisar um Produto..."
				variant="outlined"
				margin="dense"
				name="search"
				onChange={(e) => HandleOnChange(e)}
			/>
			<button type="submit" className="search-button">
				<i className="fa fa-search" />
			</button>
			<div className={searchResultsClass}>
				{searchResult.map((item, i) => <CartItem key={i} product={item} />)}
			</div>
		</form>
	);
};

const mapStateToProps = (state) => ({
	searchResult: state.search.searchNav
});

const mapDispatchToProps = { getSearchNavResults };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
