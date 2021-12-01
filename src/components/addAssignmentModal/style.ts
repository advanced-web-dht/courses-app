import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';

require('react-datepicker/dist/react-datepicker.css');

export const Form = styled(Box)`
	position: absolute;
	transform: translate(-50%, -50%);
	width: 400px;
	background-color: #fff;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	border: #fff;
`;

export const FormAction = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.8rem 2rem 2rem 2rem;

	.MuiInputBase-input {
		font-size: 17px;
		font-weight: 500;
		color: #3e4b4b;
	}

	.MuiButton-contained {
		margin-top: 10px;
		width: 50%;
		align-self: center;
	}

	.MuiFormLabel-root {
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
	}
`;

export const FormHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	border-bottom: 1px solid #edf2f1;

	div {
		flex: 1;
		font-weight: bold;
		text-rendering: optimizeLegibility;
		margin: 0;
		-webkit-font-smoothing: antialiased;
		font-size: 20px;
	}
`;

export const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const DatePickerModal = styled(DatePicker)`
	display: flex;
	font-size: 17px;
	border-radius: 4px;
	box-shadow: inset 0 2px 2px #e9e9e9;
	border: 1px solid #aeaeae;
	line-height: 16px;
	padding: 16.5px 14px;
	margin-top: 25px;
	width: 100%;
	box-sizing: border-box;

	::placeholder {
		color: black;
		opacity: 1;
	}
`;
