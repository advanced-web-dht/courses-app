import styled from 'styled-components';
import Container from '@mui/material/Container';

export const StyledContainer = styled(Container)`
	margin-top: 80px;
	display: flex;
	flex-direction: column;
`;

export const ClassesHeader = styled.div`
	font-size: 18px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 1rem;
`;

export const ClassesListContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const ClassesList = styled.ol`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-self: center;
	padding: 0;
`;
