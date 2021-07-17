import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddAddress = (props) => {
	const { fields, HandleBack, HandleOnChange, HandleAddAddress } = props;
	return (
		<div>
			<form className="container-form">
				<h1>Novo Endereço</h1>
				<div className="container-form-item">
					<label className="container-label">Bairro &nbsp;&nbsp;</label>
					<TextField
						fullWidth
						margin="dense"
						variant="outlined"
						value={fields.neightborhood || ''}
						type="text"
						name="neightborhood"
						onChange={(e) => HandleOnChange(e)}
						className="container-input"
					/>
				</div>
				<div className="container-form-item">
					<label className="container-label">Rua &nbsp;&nbsp;</label>
					<TextField
						fullWidth
						margin="dense"
						variant="outlined"
						value={fields.street || ''}
						type="text"
						name="street"
						onChange={(e) => HandleOnChange(e)}
						className="container-input"
					/>
				</div>
				<div className="container-form-item">
					<label className="container-label">Número &nbsp;&nbsp;</label>
					<TextField
						fullWidth
						margin="dense"
						variant="outlined"
						value={fields.num || ''}
						type="text"
						name="num"
						onChange={(e) => HandleOnChange(e)}
						className="container-input"
					/>
				</div>
				<div className="container-form-item">
					<label className="container-label">CEP &nbsp;&nbsp;</label>
					<TextField
						fullWidth
						margin="dense"
						variant="outlined"
						value={fields.cep || ''}
						type="text"
						name="cep"
						onChange={(e) => HandleOnChange(e)}
						className="container-input"
					/>
				</div>
				<div className="container-form-item">
					<Button className="container-input" variant="contained" disableElevation onClick={HandleBack}>
						Voltar
					</Button>
					<Button
						className="container-input"
						variant="contained"
						color="primary"
						disableElevation
						type="submit"
						onClick={(e) => HandleAddAddress(e)}
					>
						Salvar
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddAddress;
