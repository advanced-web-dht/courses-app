import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface ToolBarProps extends ToolbarProps {
	position?: string;
}

interface SectionProps {
	middle?: boolean;
}

export const Container = styled(AppBar)`
	position: sticky;
	background: initial;
	color: #3e4b4b;
	min-height: 60px;
	height: 60px;
	background: #f4f6f6;
	border: none;
	box-shadow: none;
`;

export const BottomAppBar = styled(Container)`
	visibility: hidden;
	position: fixed;
	top: auto;
	bottom: 0;
	min-height: 50px;
	height: 50px;
	@media screen and (max-width: 650px) {
		visibility: visible;
	}
`;

export const ToolBar = styled(Toolbar)<ToolBarProps>`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: ${(props) => (props.position === 'bottom' ? 'center' : 'space-between')};
	align-items: ${(props) => (props.position === 'bottom' ? 'flex-start' : 'center')};
`;

export const HeaderLink = styled.a`
	display: flex;
	align-items: center;
	.MuiTypography-h5 {
		font-weight: bold;
		margin-left: 5px;
	}
`;

export const Section = styled(Box)<SectionProps>`
	display: flex;
	align-items: center;
	@media screen and (max-width: 650px) {
		display: ${(props) => props.middle && 'none'};
	}
`;

export const Icons = styled.div`
	display: flex;
	align-items: center;
	> .MuiIconButton-root {
		display: none;
		@media screen and (max-width: 650px) {
			display: flex;
			align-items: center;
		}
	}
	> .MuiSvgIcon-root {
		@media screen and (max-width: 650px) {
			display: none;
		}
	}
`;
