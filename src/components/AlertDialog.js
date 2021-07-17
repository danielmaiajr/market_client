import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
	const { HandleAgree, open, handleClose, children } = props;

	const HandleButtonAgree = () => {
		console.log('close');
		HandleAgree();
		handleClose(false);
	};

	const handleButtonClose = () => {
		console.log('close');
		handleClose(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleButtonClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Aviso</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{children}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleButtonClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={HandleButtonAgree} color="primary">
						Continuar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AlertDialog;
