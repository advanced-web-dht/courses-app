import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Avatar from '@mui/icons-material/AccountCircleRounded';

import { Container, Section, Separator } from './style';

interface HeaderProps {
	title: string;
	icon: React.ReactNode;
	middleAction?: React.ReactNode;
	rightAction?: React.ReactNode;
}

/**
 *
 * @param props.icon header icon
 * @param props.title page title
 * @param props.middleAction private navigate for each page
 */

const Header: React.FC<HeaderProps> = (props) => {
	const { title, icon, middleAction, rightAction } = props;
	return (
		<Container>
			<Section>
				{icon}
				<Typography variant='h5'>{title}</Typography>
			</Section>
			<Separator />
			<Section>{middleAction}</Section>
			<Separator />
			<Section>
				{rightAction}
				<IconButton size='large' aria-label='user-actions'>
					<Avatar />
				</IconButton>
			</Section>
		</Container>
	);
};

Header.defaultProps = {
	middleAction: null,
	rightAction: null
};

export default Header;
