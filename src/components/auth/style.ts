import styled from 'styled-components';

import Container from '../UI/Container';
import RoundedButton from '../UI/RoundedButton';

export const StyledContainer = styled(Container)`
	align-items: center;
`;

export const FormWrapper = styled.div`
	min-width: 400px;
	@media (max-width: 600px) {
		min-width: 0;
	}
`;

export const FormHeader = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
`;

export const FormContent = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px;
`;

export const FormActions = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 15px;
	width: 100%;
	@media (max-width: 600px) {
		flex-direction: column;
		> * {
			margin-top: 5px;
		}
	}
`;

export const GoogleButton = styled(RoundedButton)`
	svg {
		margin-right: 10px;
		fill: white;
	}
`;

export const FormFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 10px;
	a {
		text-transform: capitalize;
	}
	@media (max-width: 600px) {
		justify-content: center;
	}
	.MuiButton-text {
		font-weight: bold;
		font-size: 15px;
	}
`;
