import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCartItems } from '../redux/actions/cartActions';
import { getAddress } from '../redux/actions/addressActions';

const LoadCart = (props) => {
	const { getCartItems, getAddress } = props;

	useEffect(
		() => {
			getCartItems();
			getAddress();
		},
		[ getCartItems, getAddress ]
	);
	return null;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { getCartItems, getAddress };

export default connect(mapStateToProps, mapDispatchToProps)(LoadCart);
