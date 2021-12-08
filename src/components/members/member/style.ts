import styled from '@emotion/styled';

import Card from '../../UI/Card';

export const StyledCard = styled(Card)`
	min-height: 220px;
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
