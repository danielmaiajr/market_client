import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AlertDialog from '../AlertDialog';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { changeShowCart } from '../../redux/actions/cartActions';
import { getOrders, getOrder, cancelOrder } from '../../redux/actions/orderActions';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '15px',
		marginRight: '10px'
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

const Orders = (props) => {
	const classes = useStyles();
	const { order, orderItems, getOrder, getOrders, cancelOrder, changeShowCart } = props;
	const { isLoading } = props.loading;

	const [ openDialog, setOpenDialog ] = useState(false);
	const [ cancelId, setCancelId ] = useState('');

	useEffect(
		() => {
			getOrders();
		},
		[ getOrders ]
	);

	const HandleRecreateOrder = (e, id) => {
		axios
			.post(`/api/orders/${id}`)
			.then((res) => {
				changeShowCart();
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const HandleCancelOrder = (id) => {
		setCancelId(id);
		setOpenDialog(true);
	};

	return (
		<div className="container">
			<Backdrop open={isLoading} className={classes.backdrop}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<AlertDialog open={openDialog} handleClose={setOpenDialog} HandleAgree={() => cancelOrder(cancelId)}>
				Essa ação irá cancelar o pedido, deseja continuar?
			</AlertDialog>
			<h1 className="container-title">Meus Pedidos</h1>
			<div style={{ display: 'flex' }}>
				{order.map((ord) => (
					<Paper classes={{ root: classes.root }} key={ord.order_id}>
						<div>
							<h1>{ord.payment_name}</h1>
							<h1>{ord.status_name}</h1>
							<h1>{ord.cep}</h1>
							<h1>{ord.neightborhood}</h1>
							<h1>{ord.street}</h1>
							<h1>{ord.num}</h1>
							<h1>{ord.ship_date}</h1>
							<button onClick={() => getOrder(ord.order_id)}>Ver Items</button>
							{ord.status_name === 'CANCELADA' ? null : (
								<button onClick={(e) => HandleCancelOrder(ord.order_id)}>Cancelar Pedido</button>
							)}
							<button
								onClick={(e) => {
									HandleRecreateOrder(e, ord.order_id);
								}}
							>
								Refazer Pedido
							</button>
						</div>
					</Paper>
				))}
			</div>
			<br />
			{orderItems.map((prod) => (
				<div key={prod.product_id}>
					<h1>
						{prod.quantity}x {prod.product_name}
					</h1>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	order: state.order.orders,
	orderItems: state.order.orderItems,
	loading: state.loading
});

const mapDispatchToProps = { getOrder, getOrders, cancelOrder, changeShowCart };

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
