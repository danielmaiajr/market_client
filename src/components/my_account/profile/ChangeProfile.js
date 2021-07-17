import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const ChangeProfile = (props) => {
	const { fields, HandleOnChange, HandleOnSubmit, customer, setActiveStep } = props;

	return (
		<form className="container-form">
			<div className="container-form-item">
				<label className="container-label">Email&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					placeholder={customer.email}
					disabled={true}
					className="container-input"
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">Nome&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="text"
					name="first_name"
					value={fields.first_name || ''}
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">Sobrenome&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="text"
					name="last_name"
					value={fields.last_name || ''}
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">CPF&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="text"
					name="cpf"
					value={fields.cpf || ''}
					className="container-input"
					onChange={(e) => HandleOnChange(e)}
				/>
			</div>
			<div className="container-form-item">
				<label className="container-label">Telefone&nbsp;&nbsp;</label>
				<TextField
					fullWidth
					margin="dense"
					variant="outlined"
					type="text"
					name="phone"
					value={fields.phone || ''}
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

export default ChangeProfile;
