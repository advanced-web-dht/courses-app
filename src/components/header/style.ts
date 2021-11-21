import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export const Container = styled(AppBar)`
	position: sticky;
	background: initial;
	color: #3e4b4b;
	min-height: 65px;
`;

export const ToolBar = styled(Toolbar)`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const HeaderLink = styled.a`
	display: flex;
	align-items: center;
	.MuiTypography-h5 {
		font-weight: bold;
		margin-left: 5px;
	}
`;

export const Section = styled(Box)`
	display: flex;
	align-items: center;
`;
