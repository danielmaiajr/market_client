import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postAddress, deleteAddress, putAddress } from '../../../redux/actions/addressActions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import ShowAddresses from './ShowAddresses';
import AddAddress from './AddAddress';
import ChangeAddress from './ChangeAddress';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

const Address = (props) => {
	const classes = useStyles();
	const { address, postAddress, deleteAddress, putAddress } = props;
	const { isLoading } = props.loading;

	const [ fields, setFields ] = useState({});
	const [ showAddresses, setShowAddresses ] = useState(true);
	const [ showChangeAddress, setShowChangeAddress ] = useState(false);

	const HandleOnChange = (e) => {
		e.preventDefault();
		setFields({ ...fields, [e.target.name]: e.target.value });
	};
	const HandleChangeAddress = (e) => {
		e.preventDefault();
		setShowChangeAddress(false);
		setShowAddresses(true);
		putAddress(fields);
	};

	const HandleAddAddress = (e) => {
		e.preventDefault();
		setShowChangeAddress(false);
		setShowAddresses(true);
		postAddress(fields);
	};

	const HandleRemoveAddress = (id) => {
		deleteAddress(id);
	};

	const HandleAdd = (e) => {
		e.preventDefault();
		setShowAddresses(false);
		setShowChangeAddress(false);
		setFields({});
	};

	const HandleEdit = (e, adr) => {
		setShowAddresses(false);
		setShowChangeAddress(true);
		setFields({
			...fields,
			address_id: adr.address_id,
			neightborhood: adr.neightborhood,
			num: adr.num,
			street: adr.street,
			cep: adr.cep
		});
	};

	const HandleBack = (e) => {
		e.preventDefault();
		setShowAddresses(true);
	};

	return (
		<div className="container">
			<Backdrop open={isLoading} className={classes.backdrop}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div className="container-title">
				<h1 style={{ marginRight: 30 }}>Meus Endereços</h1>
				<Button onClick={HandleAdd} variant="contained" color="primary" disableElevation>
					Adicionar Endereço
				</Button>
			</div>
			<br />
			{showAddresses ? (
				<div style={{ fontSize: 16 }}>
					<ShowAddresses
						address={address}
						HandleRemoveAddress={HandleRemoveAddress}
						HandleEdit={HandleEdit}
					/>
				</div>
			) : showChangeAddress ? (
				<ChangeAddress
					fields={fields}
					HandleBack={HandleBack}
					HandleOnChange={HandleOnChange}
					HandleChangeAddress={HandleChangeAddress}
				/>
			) : (
				<AddAddress
					fields={fields}
					HandleBack={HandleBack}
					HandleOnChange={HandleOnChange}
					HandleAddAddress={HandleAddAddress}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	address: state.address,
	loading: state.loading
});

export default connect(mapStateToProps, { postAddress, deleteAddress, putAddress })(Address);
