import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/icons-material/AccountCircleRounded';
import { useSession } from 'next-auth/client';

import useToggle from '../../hooks/useToggle';
import { Container, Section, Separator } from './style';
import UserOptions from '../userOptions';

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
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [session] = useSession();

	const { isOpen, handleClose, handleOpen } = useToggle();

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		handleOpen();
	};
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
				{session ? (
					<React.Fragment>
						{rightAction}
						<IconButton size='large' aria-label='user-actions' onClick={handleOpenMenu}>
							<Avatar />
						</IconButton>
						<UserOptions isOpen={isOpen} handleClose={handleClose} anchorEl={anchorEl} />
					</React.Fragment>
				) : (
					<Link href='/signin' passHref>
						<Button variant='text'>Đăng nhập</Button>
					</Link>
				)}
			</Section>
		</Container>
	);
};

Header.defaultProps = {
	middleAction: null,
	rightAction: null
};

export default Header;
