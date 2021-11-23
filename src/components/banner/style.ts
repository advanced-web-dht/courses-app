import styled from 'styled-components';

export const FullBanner = styled.div`
	height: 15rem;
	position: relative;
	width: 100%;
	max-width: 62.5rem;
	margin: auto;
`;

export const CustomBanner = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	background-size: cover;
	background: url('/banner.jpg') no-repeat;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	left: 0;
	top: 0;
`;

export const TitleBanner = styled.div`
	text-align: center;
	h1 {
		font-size: 2.25rem;
		font-weight: 500;
		line-height: 2.75rem;
		color: #fff;
	}
`;
