import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './checkout.css';

import { connect } from 'react-redux';
import { postOrder } from '../../redux/actions/orderActions';
import { deleteItemsCart } from '../../redux/actions/cartActions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	}
}));

function getSteps() {
	return [ 'Confirmar carrinho', 'Escolher endereço', 'Escolher horário' ];
}

function getStepContent(step, test) {
	switch (step) {
		case 0:
			return test[0];
		case 1:
			return test[1];
		case 2:
			return test[2];
		default:
			return 'Unknown step';
	}
}

const Checkout = (props) => {
	const [ selectAddress, setselectAddress ] = useState(null);
	const [ selectDate, setselectDate ] = useState(null);
	const [ delivery, setDelivery ] = useState([]);

	const classes = useStyles();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const { cartItems } = props.cart;
	const { address, postOrder, deleteItemsCart } = props;

	useEffect(() => {
		axios
			.get('/api/scheduling')
			.then((res) => {
				setDelivery(res.data);
			})
			.catch((err) => {
				console.log(err.data);
			});
	}, []);

	const HandleAddressSelect = (e, adr) => {
		setselectAddress(adr);
	};

	const HandleDateSelect = (e, id) => {
		setselectDate(id);
	};

	const HandleConfirm = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		postOrder(selectAddress, selectDate.day);
		deleteItemsCart();
	};

	const run =
		cartItems.length > 0
			? cartItems.map((product, i) => (
					<div key={i}>
						{product.quantity}x {product.product_name}
					</div>
				))
			: null;

	const test =
		address.length === 0 ? (
			<h1>Você não possui endereço cadastrado</h1>
		) : (
			<div style={{ display: 'flex' }}>
				{address.map((adr, i) => (
					<div key={i} className={adr === selectAddress ? 'selecionado' : null}>
						<h1>CEP: {adr.cep}</h1>
						<h1>Bairro: {adr.neightborhood}</h1>
						<h1>Rua: {adr.street}</h1>
						<h1>Número: {adr.num}</h1>
						<button
							onClick={(e) => {
								HandleAddressSelect(e, adr);
							}}
						>
							Selecionar
						</button>
					</div>
				))}
			</div>
		);

	const test2 = (
		<div style={{ display: 'flex' }}>
			{delivery.map((d, i) => (
				<div key={i} className={d === selectDate ? 'selecionado' : null}>
					<h1>Dia: {d.day}</h1>
					<h1>Periodo: {d.period}</h1>
					<button
						onClick={(e) => {
							HandleDateSelect(e, d);
						}}
					>
						Selecionar
					</button>
				</div>
			))}
		</div>
	);

	const test3 = [ run, test, test2 ];

	return (
		<div style={{ width: '90%', margin: '0 auto' }}>
			<div className={classes.root}>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((label, index) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
							<StepContent>
								{getStepContent(index, test3)}
								<div className={classes.actionsContainer}>
									<div>
										<Button
											disabled={activeStep === 0}
											onClick={handleBack}
											className={classes.button}
										>
											Voltar
										</Button>
										{activeStep === steps.length - 1 ? (
											<Button
												variant="contained"
												color="primary"
												onClick={HandleConfirm}
												className={classes.button}
											>
												Finalizar
											</Button>
										) : (
											<Button
												variant="contained"
												color="primary"
												onClick={handleNext}
												className={classes.button}
											>
												Próximo
											</Button>
										)}
										{/* <Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
										</Button> */}
									</div>
								</div>
							</StepContent>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0} className={classes.resetContainer}>
						<Typography>Ordem Criada</Typography>
					</Paper>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart,
	address: state.address
});

const mapDispatchToProps = {
	postOrder,
	deleteItemsCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
