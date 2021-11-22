import styled from 'styled-components';

interface CardProps {
	background?: string;
}

const Card = styled.div<CardProps>`
	background-color: ${(props) => props.background || '#fff'};
	border-radius: 6px;
	box-shadow: rgb(0 0 0 / 20%) 0 2px 1px -1px, rgb(0 0 0 / 14%) 0 1px 1px 0, rgb(0 0 0 / 12%) 0 1px 3px 0;
	padding: 24px;
	display: flex;
	flex-direction: column;
	:hover {
		box-shadow: 0 1px 2px 1px rgb(62 75 75 / 40%);
		cursor: pointer;
	}
`;

export default Card;
