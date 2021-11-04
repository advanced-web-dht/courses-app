import styled from 'styled-components';

export const StyledCard = styled.li`
	background-color: #fff;
	border-radius: 6px;
	box-shadow: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0, rgb(0 0 0 / 12%) 0 1px 3px 0;
	position: relative;
	outline: 0;
	width: 350px;
	min-width: 300px;
	max-width: 384px;
	min-height: 195px;
	margin: 10px;
	display: flex;
	padding: 24px;
	flex-direction: column;
	justify-content: space-between;

	&.fake-card {
		font-size: 18px;
		font-weight: 600;
		justify-content: center;
		align-items: center;
		color: #3e4b4b;
		:hover {
			color: #38b4fc;
		}
		& > div {
			display: flex;
			align-items: center;
			& div {
				margin-left: 10px;
			}
		}
	}

	@media only screen and (max-width: 900px) {
		width: 100%;
		min-width: initial;
		max-width: 100%;
	}

	:hover {
		box-shadow: 0 1px 2px 1px rgb(62 75 75 / 40%);
		cursor: pointer;
	}
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	& > div {
		min-height: 60px;
		min-width: 60px;
	}
	& > .class-title {
		margin-left: 10px;
		color: #3e4b4b;
		font-weight: bold;
		text-rendering: optimizeLegibility;
		line-height: 1.29em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	& .class-name {
		color: #3e4b4b;
		font-weight: bold;
	}
`;

export const CardFooter = styled.div`
	display: flex;
	justify-content: flex-end;
`;
