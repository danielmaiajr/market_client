import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { getCustomer, putCustomer } from '../../../redux/actions/customerAction';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import ChangePassword from './ChangePassword';
import ShowProfile from './ShowProfile';
import ChangeProfile from './ChangeProfile';

const useStyles = makeStyles({
	root: {
		color: 'white'
	}
});

function Alert(props) {
	const classes = useStyles();
	return <MuiAlert elevation={6} classes={{ root: classes.root }} variant="filled" {...props} />;
}

function getStepContent(step, component) {
	switch (step) {
		case 0:
			return component[0];
		case 1:
			return component[1];
		case 2:
			return component[2];
		default:
			return 'Unknown step';
	}
}

const Profile = (props) => {
	const { getCustomer, putCustomer, customer } = props;

	const [ fields, setFields ] = useState({});
	const [ activeStep, setActiveStep ] = useState(0);
	const [ open, setOpen ] = useState(false);
	const [ message, setMessage ] = useState(null);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	useEffect(() => getCustomer(), [ getCustomer ]);

	useEffect(
		() =>
			setFields({
				first_name: customer.first_name,
				last_name: customer.last_name,
				cpf: customer.cpf,
				phone: customer.phone
			}),
		[ customer ]
	);

	const HandleOnChange = (e) => {
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const HandleOnSubmit = (e) => {
		e.preventDefault(e);
		putCustomer(fields);
		getCustomer();
		setActiveStep(0);
	};

	const component = [
		<ShowProfile customer={customer} setActiveStep={setActiveStep} />,
		<ChangeProfile
			customer={customer}
			fields={fields}
			setActiveStep={setActiveStep}
			HandleOnChange={HandleOnChange}
			HandleOnSubmit={HandleOnSubmit}
		/>,
		<ChangePassword setActiveStep={setActiveStep} setMessage={setMessage} setOpen={setOpen} />
	];

	return (
		<div className="container">
			<h1 className="container-title">Cadastro</h1>
			{getStepContent(activeStep, component)}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				severity="success"
				open={open}
				resumeHideDuration={1000}
				autoHideDuration={3500}
				onClose={handleClose}
			>
				<Alert onClose={handleClose}>{message}</Alert>
			</Snackbar>
		</div>
	);
};

const mapStateToProps = (state) => ({
	customer: state.customer
});

const mapDispatchToProps = { getCustomer, putCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
