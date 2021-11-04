import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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

	& .classname-input {
		height: 80px;
	}

	& input {
		font-size: 17px;
		font-weight: 500;
		color: #3e4b4b;
	}

	& button {
		margin-top: 10px;
		width: 50%;
		align-self: center;
	}
`;

export const FormHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	border-bottom: 1px solid #edf2f1;
	& div {
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
