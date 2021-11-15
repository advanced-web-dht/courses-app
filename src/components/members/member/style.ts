import styled from 'styled-components';

export const StyledCard = styled.div`
	visibility: hidden;
	border-radius: 6px;
	box-shadow: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0, rgb(0 0 0 / 12%) 0 1px 3px 0;
	min-height: 220px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	:hover {
		visibility: visible;
	}

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

	//@media only screen and (max-width: 900px) {
	//	width: 100%;
	//	min-width: initial;
	//}

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
	margin-top: auto;
	display: flex;
	justify-content: flex-end;
`;

export const CardContent = styled.div`
	visibility: visible;
	background-color: #edf2f1;
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	padding: 30px;
`;

export const CardLabel = styled.div`
	visibility: visible;
	width: 100%;
	padding-top: 8px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;