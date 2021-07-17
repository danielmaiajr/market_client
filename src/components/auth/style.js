import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4e3188;
`;

export const Content = styled.div`
	height: 500px;
	max-height: 85%;
	width: 400px;
	max-width: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background-color: #fff;
`;

export const FormContent = styled.form`
	width: 80%;
	height: 100%;
	padding: 15px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export const TitleContent = styled.div`padding: 10px 20px;`;

export const Title = styled.h1`
	text-align: center;
	color: #111;
	font-size: 24px;
	padding: 5px;
`;

export const SubTitle = styled.h2`
	text-align: center;
	color: #222;
	font-size: 14px;
	padding: 5px;
`;

export const InputContent = styled.div`
	width: 100%;
	padding: 10px;
`;

export const Input = styled.div`padding: 10px 20px;`;

export const SmallLabel = styled.h1`
	display: flex;
	justify-content: flex-end;
	font-size: 12px;
	padding-right: 10px;
`;

export const ButtonContent = styled.div`
	width: 80%;
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
`;

export const PoliceContent = styled.h3`
	font-size: 10px;
	text-align: center;
	padding: 10px 0;
`;

export const ColorButton = withStyles((theme) => ({
	root: {
		textTransform: 'capitalize',
		width: '50%',
		color: 'white',
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px'
		},
		backgroundColor: '#7027C3',
		'&:hover': {
			backgroundColor: '#5416B4'
		}
	}
}))(Button);

export const WhiteButton = withStyles((theme) => ({
	root: {
		textTransform: 'capitalize',
		width: '45%',
		[theme.breakpoints.down('sm')]: {
			fontSize: '10px'
		}
	}
}))(Button);
