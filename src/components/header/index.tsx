import React, { useRef } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
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
	isSignIn?: boolean;
	isSignUp?: boolean;
}

/**
 *
 * @param props.icon header icon
 * @param props.title page title
 * @param props.middleAction private navigate for each page
 */

const Header: React.FC<HeaderProps> = (props) => {
	const { title, icon, middleAction, rightAction, isAuth, isSignIn, isSignUp } = props;

	const userRef = useRef<HTMLButtonElement>(null);

	const { isOpen, handleClose, handleOpen } = useToggle();

	return (
		<React.Fragment>
			<Container>
				<ToolBar>
					<Tooltip title='Quay về lớp học'>
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
					</Tooltip>
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
	isSignUp: false
};

export default Header;
