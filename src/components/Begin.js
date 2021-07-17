import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const Begin = (props) => {
	const { isAuthenticated } = props.auth;
	const { history } = props;
	const [ cep, setCep ] = useState('');
	const [ cepResponse, setCepResponse ] = useState(null);

	useEffect(
		() => {
			if (isAuthenticated) {
				history.push('/home');
			}
		},
		[ isAuthenticated, history ]
	);

	const HandleCheck = (e) => {
		e.preventDefault();
		axios
			.get(`/api/checkcep/${cep}`)
			.then((res) => {
				setCepResponse(res.data.cep);
			})
			.catch((err) => {
				setCepResponse(err.response.data.cep);
			});
	};

	const HandleChange = (e) => {
		setCep(e.target.value);
	};

	return (
		<div>
			<div>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
			</div>
			<br />
			<div>
				<form>
					<input placeholder="Digite seu CEP" onChange={HandleChange} />
					<button onClick={HandleCheck}>Verificar</button>
					{cepResponse ? <div>{cepResponse}</div> : null}
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {})(Begin);
