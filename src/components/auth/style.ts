import styled from 'styled-components';

import Container from '../UI/Container';

export const StyledContainer = styled(Container)`
	align-items: center;
	#signin-form {
		min-width: 350px;
	}
`;

export const FormHeader = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 1rem;
	text-align: center;
`;

export const FormContent = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FormFooter = styled.div`
	display: flex;
	flex-direction: column;
	#signin-buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		button {
			margin: 5px 0px;
			padding: 3px 25px;
			text-transform: initial;
			border-radius: 20px;
			font-size: 1.1rem;
			svg {
				margin-right: 10px;
				fill: white;
			}
		}
		#google-signin {
			background-color: rgb(221, 43, 44);
		}
	}
`;

export const RouteAction = styled.div`
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
`;
