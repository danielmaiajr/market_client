import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';

import {
	Wrapper,
	Content,
	FormContent,
	TitleContent,
	Title,
	SubTitle,
	InputContent,
	SmallLabel,
	Input,
	ButtonContent,
	ColorButton,
	WhiteButton,
	PoliceContent
} from './style';

import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

const Login = (props) => {
	const [ fields, setFields ] = useState({});
	const { history } = props;
	const { isAuthenticated } = props.auth;

	useEffect(() => {
		if (isAuthenticated) {
			history.push('/home');
		}
	});

	const HandleOnChange = (e) => {
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const HandleOnSubmit = (e) => {
		e.preventDefault();

		props.loginUser({
			email: fields.email,
			password: fields.password
		});
	};

	const HandleLink = (e) => {
		e.preventDefault();
		history.push('/register');
	};

	return (
		<Wrapper>
			<Content>
				<FormContent>
					<TitleContent>
						<Title>Bem Vindo ao Market</Title>
						<SubTitle>Faça Login para começar</SubTitle>
					</TitleContent>
					<InputContent>
						<Input>
							<TextField
								error={false}
								helperText={null}
								fullWidth
								type="email"
								placeholder="Email"
								name="email"
								value={fields.email}
								onChange={HandleOnChange}
							/>
						</Input>
						<Input>
							<TextField
								fullWidth
								type="password"
								placeholder="Senha"
								name="password"
								value={fields.password}
								onChange={HandleOnChange}
							/>
						</Input>
						<SmallLabel>Esqueceu a senha?</SmallLabel>
					</InputContent>
					<ButtonContent>
						<ColorButton variant="contained" color="primary" disableElevation onClick={HandleOnSubmit}>
							Login
						</ColorButton>
						<WhiteButton variant="outlined" disableElevation onClick={HandleLink}>
							Criar Conta
						</WhiteButton>
					</ButtonContent>
					<PoliceContent>
						*Ao continuar, você concorda com os Termos de Serviço e com a Política de Privacidade do Market
					</PoliceContent>
				</FormContent>
			</Content>
		</Wrapper>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
