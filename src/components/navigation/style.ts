import styled, { css } from 'styled-components';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';

import theme from '../../theme';

interface ExtendedDrawerProps extends DrawerProps {
	$expanded?: boolean;
}

const drawerWidth = '240px';

const openStyles = css`
	width: ${drawerWidth};
	transition: width 0.2s ${theme.transitions.easing.sharp};
	box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
	overflow-x: hidden;
`;

const closeStyles = css`
	width: 70px;
	transition: width 0.2s ${theme.transitions.easing.sharp};
	overflow-x: hidden;
`;

const expandedStyles = css`
	width: ${drawerWidth};
	transition: width 0.2s ${theme.transitions.easing.sharp};
	.MuiDrawer-paper {
		${openStyles}
	}
`;

export const StyledDrawer = styled(Drawer)<ExtendedDrawerProps>`
	width: 71px;
	flex-shrink: 0;
	white-space: nowrap;
	box-sizing: border-box;
	transition: width 0.2s ${theme.transitions.easing.sharp};
	${(props) =>
		props.$expanded
			? expandedStyles
			: css`
					.MuiDrawer-paper {
						${props.open ? openStyles : closeStyles}
					}
			  `}
`;

export const DrawerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	width: ${drawerWidth};
	height: 60px;
	padding: 5px;
`;

export const StandName = styled.div`
	border-radius: 50%;
	background-color: #38b4fc;
	color: #fff;
	width: 35px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	margin-right: 10px;
`;

export const SubListItemButton = styled(ListItemButton)`
	padding-left: 30px;
`;

export const HomePage = styled.div`
	display: flex;
	align-items: center;
	margin-left: 15px;
	:hover {
		cursor: pointer;
	}
`;
