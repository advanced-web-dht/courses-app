import React, { useRef } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/icons-material/AccountCircleRounded';

import useToggle from '../../hooks/useToggle';
import { Container, Section, ToolBar, HeaderLink, BottomAppBar } from './style';
import UserOptions from '../userOptions';

interface HeaderProps {
	title: string;
	icon: React.ReactNode;
	middleAction?: React.ReactNode;
	rightAction?: React.ReactNode;
	isAuth?: boolean;
}

/**
 *
 * @param props.icon header icon
 * @param props.title page title
 * @param props.middleAction private navigate for each page
 */

const Header: React.FC<HeaderProps> = (props) => {
	const { title, icon, middleAction, rightAction, isAuth } = props;

	const userRef = useRef<HTMLButtonElement>(null);

	const { isOpen, handleClose, handleOpen } = useToggle();

	return (
		<React.Fragment>
			<Container>
				<ToolBar>
					<Section>
						<Link href='/class' passHref>
							<HeaderLink>
								{icon}
								<Typography variant='h5' component='h1'>
									{title}
								</Typography>
							</HeaderLink>
						</Link>
					</Section>
					<Section middle>{middleAction}</Section>
					<Section>
						{isAuth ? (
							<React.Fragment>
								{rightAction}
								<IconButton
									size='large'
									aria-label='user-actions'
									onClick={() => handleOpen()}
									ref={userRef}
								>
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
					{isOpen && <UserOptions isOpen={isOpen} handleClose={handleClose} anchorEl={userRef.current} />}
				</ToolBar>
			</Container>
			<BottomAppBar>
				<ToolBar position='bottom'>{middleAction}</ToolBar>
			</BottomAppBar>
		</React.Fragment>
	);
};

Header.defaultProps = {
	middleAction: null,
	rightAction: null,
	isAuth: false
};

export default Header;
