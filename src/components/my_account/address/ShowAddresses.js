import React, { useState } from 'react';

import AlertDialog from '../../AlertDialog';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	root: {
		padding: '15px',
		marginRight: '10px'
	}
});

const ShowAddresses = (props) => {
	const classes = useStyles();
	const { address, HandleRemoveAddress, HandleEdit } = props;

	const [ openDialog, setOpenDialog ] = useState(false);
	const [ removeId, setremoveId ] = useState('');

	const HandleRemove = (id) => {
		setremoveId(id);
		setOpenDialog(true);
	};

	return (
		<div style={{ display: 'flex' }}>
			<AlertDialog
				open={openDialog}
				handleClose={setOpenDialog}
				HandleAgree={() => HandleRemoveAddress(removeId)}
			>
				Essa ação irá remover o endereço, deseja continuar?
			</AlertDialog>
			{address.map((adr, i) => (
				<Paper classes={{ root: classes.root }} key={i}>
					<div>
						<h1>Bairro: {adr.neightborhood}</h1>
						<h1>Rua: {adr.street}</h1>
						<h1>Número: {adr.num}</h1>
						<h1>CEP: {adr.cep}</h1>
						<button onClick={(e) => HandleRemove(adr.address_id)}>remover</button>
						<button onClick={(e) => HandleEdit(e, adr)}>editar</button>
					</div>
				</Paper>
			))}
		</div>
	);
};

export default ShowAddresses;
