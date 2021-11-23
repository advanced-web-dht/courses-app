import styled from 'styled-components';
import Modal from '@mui/material/Modal';

export const CustomModal = styled.div`
	font-size: 12px;
	width: 400px;
	background-color: #fff;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	padding: 30px;
`;

export const FormContent = styled.form`
	display: flex;
	flex-direction: column;
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
`;
