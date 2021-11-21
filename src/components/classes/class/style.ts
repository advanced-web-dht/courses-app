import styled from 'styled-components';

export const StyledCard = styled.div`
	background-color: #fff;
	border-radius: 6px;
	box-shadow: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0, rgb(0 0 0 / 12%) 0 1px 3px 0;
	min-height: 220px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	:hover {
		box-shadow: 0 1px 2px 1px rgb(62 75 75 / 40%);
		cursor: pointer;
	}
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
