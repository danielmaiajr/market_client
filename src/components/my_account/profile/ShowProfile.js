import React from 'react';

import Button from '@material-ui/core/Button';

const ShowProfile = (props) => {
	const { customer, setActiveStep } = props;

	return (
		<div className="container-form">
			<div className="container-form-label">
				<div className="container-label">Email:&nbsp;</div>
				<div className="container-input" style={{ color: '#555' }}>
					{customer.email}
				</div>
			</div>
			<div className="container-form-label">
				<div className="container-label">Nome:&nbsp;</div>
				<div className="container-input" style={{ color: '#555' }}>
					{customer.first_name}
				</div>
			</div>
			<div className="container-form-label">
				<div className="container-label">Sobrenome:&nbsp;</div>
				<div className="container-input" style={{ color: '#555' }}>
					{customer.last_name}
				</div>
			</div>
			<div className="container-form-label">
				<div className="container-label">CPF:&nbsp;</div>
				<div className="container-input" style={{ color: '#555' }}>
					{customer.cpf}
				</div>
			</div>
			<div className="container-form-label">
				<div className="container-label">Telefone:&nbsp;</div>
				<div className="container-input" style={{ color: '#555' }}>
					{customer.phone}
				</div>
			</div>
			<br />
			<div>
				<Button variant="outlined" color="primary" onClick={() => setActiveStep(1)}>
					ALTERAR DADOS
				</Button>
				<Button variant="outlined" color="primary" onClick={() => setActiveStep(2)}>
					ALTERAR SENHA
				</Button>
			</div>
		</div>
	);
};

export default ShowProfile;
