import React, { useRef, useContext } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/icons-material/AccountCircleRounded';
import MenuIcon from '@mui/icons-material/Menu';

import { CommonContext } from '../../store/common';
import useToggle from '../../hooks/useToggle';
import { Container, Section, ToolBar, HeaderLink, BottomAppBar, Icons } from './style';
import UserOptions from '../userOptions';

interface HeaderProps {
	title: string;
	icon: React.ReactNode;
	middleAction?: React.ReactNode;
	rightAction?: React.ReactNode;
	isAuth?: boolean;
	isSignIn?: boolean;
	isSignUp?: boolean;
	link?: string;
}

/**
 *
 * @param props.icon header icon
 * @param props.title page title
 * @param props.middleAction private navigate for each page
 */

const Header: React.FC<HeaderProps> = (props) => {
	const { title, icon, middleAction, rightAction, isAuth, isSignIn, isSignUp, link } = props;

	const userRef = useRef<HTMLButtonElement>(null);

	const { isOpen, handleClose, handleOpen } = useToggle();
	const { openNav } = useContext(CommonContext);

	return (
		<React.Fragment>
			<Container>
				<ToolBar>
					<Section>
						<Icons>
							<IconButton onClick={openNav}>
								<MenuIcon />
							</IconButton>
							{icon}
						</Icons>
						<Link href={link as string} passHref>
							<Tooltip title='Quay về lớp học'>
								<HeaderLink>
									<Typography variant='h5' component='h1'>
										{title}
									</Typography>
								</HeaderLink>
							</Tooltip>
						</Link>
					</Section>
					<Section middle>{middleAction}</Section>
					<Section>
						{isAuth ? (
							<React.Fragment>
								{rightAction}
								<Tooltip title='Tài khoản của bạn'>
									<IconButton
										size='large'
										aria-label='user-actions'
										onClick={() => handleOpen()}
										ref={userRef}
									>
										<Avatar />
									</IconButton>
								</Tooltip>
							</React.Fragment>
						) : (
							<React.Fragment>
								{isSignUp && (
									<Link href='/signin' passHref>
										<Button variant='contained' color='primary' size='small'>
											Đăng nhập
										</Button>
									</Link>
								)}
								{isSignIn && (
									<Link href='/signup' passHref>
										<Button variant='contained' color='primary' size='small'>
											Đăng ký
										</Button>
									</Link>
								)}
							</React.Fragment>
						)}
					</Section>
					{isOpen && <UserOptions isOpen={isOpen} handleClose={handleClose} anchorEl={userRef.current} />}
				</ToolBar>
			</Container>
			<Divider />
			{middleAction && (
				<BottomAppBar>
					<ToolBar position='bottom'>{middleAction}</ToolBar>
				</BottomAppBar>
			)}
		</React.Fragment>
	);
};

Header.defaultProps = {
	middleAction: null,
	rightAction: null,
	isAuth: false,
	isSignIn: false,
	isSignUp: false,
	link: '/class'
};

export default Header;
