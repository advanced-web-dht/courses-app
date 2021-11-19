import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { createTheme } from '@material-ui/core/styles';

export const CustomModal = styled.div`
	font-size: 12px;
	min-width: 600px;
	max-width: 980px;
	background-color: #fff;
	border-radius: 6px;
	max-height: 85vh;
	display: flex;
	flex-direction: column;
	& > .content {
		width: 100%;
		padding: 10px 5px;
	}
	& > .actions {
		margin: auto;
	}
	& > .actions {
		width: 100%;
		padding: 10px 5px;
		text-align: center;
	}
	& > .close {
		cursor: pointer;
		position: absolute;
		display: block;
		padding: 2px 5px;
		line-height: 20px;
		right: -10px;
		top: -10px;
		font-size: 24px;
		background: #ffffff;
		border-radius: 18px;
		border: 1px solid #cfcece;
	}
`;

export const StyledModal = styled(Modal)`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
	border: #fff;
`;

export const FormFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	& .save-button {
		margin-bottom: 10px;
	}
	& .cancel-button {
		margin-bottom: 10px;
	}
	& div {
		display: flex;
		justify-content: space-between;
		column-gap: 20px;
	}
`;

export const buttonTheme = createTheme({
	palette: {
		primary: { main: '#0073e6', contrastText: '#fff' },
		secondary: { main: '#fff', contrastText: '#3e4b4b' }
	}
});
