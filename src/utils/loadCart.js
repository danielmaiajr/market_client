import store from '../redux/store';

export const loadCart = () => {
	if (localStorage.cart) {
		const localCart = JSON.parse(localStorage.getItem('cart'));
		if (localCart.length > 0) {
			store.dispatch({
				type: 'SET_CART',
				payload: localCart
			});
		}
	}
};
