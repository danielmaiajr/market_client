import { logoutUser } from '../redux/actions/authActions';
import setAuthToken from '../config/axios/setAuthToken';
import store from '../redux/store';
import jwt_decode from 'jwt-decode';

export const loginCheck = () => {
	if (localStorage.jwtToken) {
		const currentTime = Date.now() / 1000;
		const decoded = jwt_decode(localStorage.jwtToken);
		if (decoded.exp < currentTime) {
			store.dispatch(logoutUser());
			//Talvez tenha que mudar
			delete localStorage.jwtToken;
			window.location.href = '/login';
		}
		setAuthToken(localStorage.jwtToken);

		store.dispatch({
			type: 'GET_CURRENT_USER',
			payload: decoded
		});
	}
};
