import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	border-bottom: 1px solid #edf2f1;
	flex: 1;
	font-weight: bold;
	text-rendering: optimizeLegibility;
	margin: 0;
	-webkit-font-smoothing: antialiased;
	font-size: 20px;
`;

export const Content = styled.div`
	& > div {
		width: 100%;
		padding: 10px 5px;
	}
	& .content {
		display: flex;
		flex-direction: column;
		& .classname-input {
			margin: 10px;
		}
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
