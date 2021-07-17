import React, { useState } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ChangePassword = (props) => {
	const { setActiveStep, setMessage, setOpen } = props;
	const [ fields, setFields ] = useState({});

	const [ error, setError ] = useState(null);

	const HandleOnChange = (e) => {
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const HandleOnSubmit = (e) => {
		const data = {
			password: fields.password,
			new_password: fields.new_password
		};
		axios
			.put('/api/customers/change-password', data)
			.then((res) => {
				setOpen(true);
				setMessage('Senha alterada com sucesso');
				setActiveStep(0);
				console.log(res.data);
			})
			.catch((err) => {
				setError(err.response.data.senha);
			});
	};

	return (
		<form className="container-form">
			<h1>Alterar Senha</h1>
			<div className="container-form-item">
				<label className="container-label">Senha&nbsp;&nbsp;</label>
				<TextField
					error={error ? true : false}
					helperText={error ? error : null}
					fullWidth
					margin="dense"
					variant="outlined"
					type="password"
					name="password"
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">Nova Senha&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="password"
					name="new_password"
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">Confirmar Senha&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="password"
					name="confirm_password"
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<br />
			<div>
				<Button onClick={() => setActiveStep(0)} variant="contained" disableElevation>
					Voltar
				</Button>
				<Button onClick={HandleOnSubmit} variant="contained" color="primary" disableElevation>
					Salvar
				</Button>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
