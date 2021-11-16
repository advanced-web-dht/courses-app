import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export const Container = styled(AppBar)`
	position: sticky;
	padding: 0.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: inherit;
	color: #3e4b4b;
	@media only screen and (max-width: 900px) {
		padding: 0;
	}
	min-height: 65px;
`;

export const Section = styled(Box)`
	display: flex;
	align-items: center;
	margin: 0 0.5rem;
	> * {
		margin: 0 0.5rem;
	}
	a {
		display: flex;
		align-items: center;
		h5 {
			margin-left: 5px;
			font-weight: bold;
			font-size: 1.4rem;
		}
	}

	&.middle-action {
		align-self: flex-end;
		margin: 0;
	}
`;
