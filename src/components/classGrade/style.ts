import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button, { ButtonProps } from '@mui/material/Button';

export const ListGrade = styled.div`
	display: flex;
	flex-direction: column;
`;

interface ContainerProps {
	position?: 'sticky' | 'relative';
}

export const GradeContainer = styled.form<ContainerProps>`
	position: ${(props) => props.position};
	display: flex;
	width: 100%;
	justify-content: space-between;
	background-color: #fff;
	margin: 15px 0;
	border-radius: 10px;
	min-height: 150px;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`;

GradeContainer.defaultProps = {
	position: 'relative'
};

export const GradeForm = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	margin: 5px 20px;
	.MuiTextField-root {
		margin: 10px 0;
	}
`;

export const GradeActions = styled.div`
	display: flex;
	flex-direction: column;
`;

interface ActionButtonProps extends ButtonProps {
	todo: 'edit' | 'save' | 'delete' | 'cancel';
}

export const ActionButton = styled(Button)<ActionButtonProps>`
	padding: 0;
	min-width: 40px;
	height: 100%;
	box-shadow: none;
	border-radius: 0;
	${(props) => {
		switch (props.todo) {
			case 'edit':
			case 'cancel':
				return css`
					border-top-right-radius: 10px;
				`;
			case 'delete':
			case 'save':
				return css`
					border-bottom-right-radius: 10px;
				`;
			default:
				return css``;
		}
	}}
`;

export const ActivateMask = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
	:hover {
		color: #38b4fc;
		cursor: pointer;
	}
	> * {
		margin: 5px;
	}
`;
