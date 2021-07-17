import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		textTransform: 'uppercase',
		height: '100%',
		width: '100%'
	}
}));

const MyButton = ({ children, ...props }) => {
	const classes = useStyles();
	return (
		<Button className={classes.root} {...props}>
			{children}
		</Button>
	);
};

export default MyButton;
