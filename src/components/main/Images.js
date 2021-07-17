import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function Images() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.carousel} />
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		marginTop: 40,
		justifyContent: 'center'
	},
	carousel: {
		width: '80%',
		height: 400,
		backgroundColor: theme.palette.background.paper,
		border: `solid 1px ${theme.palette.divider}`, //CHANGE: THEME
		borderRadius: 4 //CHANGE: THEME
	}
}));
