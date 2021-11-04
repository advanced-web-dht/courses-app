import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export const Container = styled(AppBar)`
	padding: 0.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: #f4f6f6;
	color: #3e4b4b;
	@media only screen and (max-width: 900px) {
		padding: 0;
	}
`;

export const Section = styled(Box)`
	display: flex;
	align-items: center;
	margin: 0 0.5rem;
	& > * {
		margin: 0 0.5rem;
	}

	& h5 {
		font-weight: bold;
		font-size: 1.4rem;
	}
`;

export const Separator = styled.div`
	flex-grow: 1;
`;
