import React, { useContext } from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import { CommonContext } from '../../store/common';
import { Container, Section, ToolBar, HeaderLink, Icons } from './style';

interface HeaderProps {
	title: string;
	icon: React.ReactNode;
	link?: string;
}

const Header: React.FC<HeaderProps> = ({ icon, title, children, link }) => {
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
					{children}
				</ToolBar>
			</Container>
			<Divider />
		</React.Fragment>
	);
};

Header.defaultProps = {
	link: '/class'
};

export default Header;
