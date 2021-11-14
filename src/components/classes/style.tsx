import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

export const ClassesHeader = styled.div`
	font-size: 18px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 1rem;
	margin-bottom: 1rem;
`;

export const ClassesListContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const ClassesList = styled(({ children }) => (
	<Grid component='ol' container spacing={2}>
		{children}
	</Grid>
))`
	display: flex;
	flex-wrap: wrap;
	align-self: center;
	justify-content: flex-start;
`;
