import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

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

export const FormHeader = styled('header')`
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

export const FormAction = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 2rem;
	& > div {
		margin: 10px 0;
	}
	& * {
		font-size: 16px;
	}
	& button {
		width: 50%;
		align-self: center;
	}
`;
