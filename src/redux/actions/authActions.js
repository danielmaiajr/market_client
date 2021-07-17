import { GET_CURRENT_USER } from '../types';
import axios from 'axios';
import setAuthToken from '../../config/axios/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/customers', userData)
		.then((res) => {
			history.push('/login');
			console.log(res);
		})
		.catch((err) => {
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			});
			console.log(err.response);
		});
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/customers/login', userData)
		.then((res) => {
			//Salvar no localstorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);

			//Colocar token no header
			setAuthToken(token);

			//Decodificar token para conseguir os dados do usuario
			const decoded = jwt_decode(token);

			//Colocar o usuario na store
			dispatch({
				type: GET_CURRENT_USER,
				payload: decoded
			});
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

export const logoutUser = (history) => (dispatch) => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch({
		type: GET_CURRENT_USER,
		payload: {}
	});
	history.push('/');
};
