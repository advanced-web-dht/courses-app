import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/icons-material/AccountCircleRounded';
import { Session } from 'next-auth';

import useToggle from '../../hooks/useToggle';
import { Container, Section } from './style';
import UserOptions from '../userOptions';

interface HeaderProps {
	title: string;
	icon: React.ReactNode;
	middleAction?: React.ReactNode;
	rightAction?: React.ReactNode;
	session?: Session;
}

/**
 *
 * @param props.icon header icon
 * @param props.title page title
 * @param props.middleAction private navigate for each page
 */

const Header: React.FC<HeaderProps> = (props) => {
	const { title, icon, middleAction, rightAction, session } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const { isOpen, handleClose, handleOpen } = useToggle();

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		handleOpen();
	};
	return (
		<Container>
			<Section>
				<Link href='/class'>
					<a>
						{icon}
						<Typography variant='h5'>{title}</Typography>
					</a>
				</Link>
			</Section>
			<Section className='middle-section'>{middleAction}</Section>
			<Section>
				{session ? (
					<React.Fragment>
						{rightAction}
						<IconButton size='large' aria-label='user-actions' onClick={handleOpenMenu}>
							<Avatar />
						</IconButton>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Link href='/signin' passHref>
							<Button variant='text'>Đăng nhập</Button>
						</Link>
						<Link href='/signup' passHref>
							<Button variant='contained' color='error'>
								Đăng ký
							</Button>
						</Link>
					</React.Fragment>
				)}
			</Section>
			{isOpen && <UserOptions isOpen={isOpen} handleClose={handleClose} anchorEl={anchorEl} />}
		</Container>
	);
};

Header.defaultProps = {
	middleAction: null,
	rightAction: null,
	session: undefined
};

export default Header;
