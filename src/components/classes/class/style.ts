import styled from 'styled-components';

import Card from '../../UI/Card';

export const StyledCard = styled(Card)`
	min-height: 220px;
`;

export const FakeCard = styled(StyledCard)`
	font-size: 18px;
	font-weight: 600;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: #3e4b4b;
	:hover {
		color: #38b4fc;
	}
	& div {
		margin-left: 10px;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	& > div {
		min-height: 60px;
		min-width: 60px;
	}
`;

export const ClassTitle = styled.div`
	margin-left: 10px;
	.MuiTypography-h5 {
		color: #3e4b4b;
		font-weight: bold;
		text-rendering: optimizeLegibility;
		line-height: 1.29em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.MuiTypography-subtitle2 {
		color: #3e4b4b;
		font-weight: bold;
	}
`;

export const CardFooter = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: flex-end;
`;
