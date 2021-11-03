import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const StyledContainer = styled(Container)`
	margin-top: 80px;
	display: flex;
	flex-direction: column;
`;

export const ClassesHeader = styled('div')`
	font-size: 18px;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 1rem;
`;

export const ClassesList = styled('ol')`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-self: center;
	padding: 0;
`;
