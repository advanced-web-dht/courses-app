import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { NextRouter, withRouter } from 'next/router';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/icons-material/AccountCircleRounded';
import PlusIcon from '@mui/icons-material/Add';

import { AppState } from '../../reducers';
import Navigation from '../navigation';
import NavTabs from '../navTab';
import Header from '../header';
import { Section } from '../header/style';
import UserOptions from '../userOptions';
import AddClassModal from '../addClassModal';
import useToggle from '../../hooks/useToggle';
import InviteStudentPopup from '../inviteStudentPopup';
import { ROLES } from '../../constants';

interface ClassLayoutProps {
	router: NextRouter;
	icon: React.ReactNode;
	title: string;
}

const ClassLayout: React.FC<ClassLayoutProps> = ({ children, router, icon, title }) => {
	const userRef = useRef<HTMLButtonElement>(null);
	const { isOpen, handleClose, handleOpen } = useToggle();

	const { info: currentClass } = useSelector((state: AppState) => state.currentClass);

	return (
		<Box sx={{ display: 'flex' }}>
			<Navigation />
			<Box width='100%'>
				<Header
					icon={icon}
					title={title}
					link={router.pathname === '/class/[code]/grade' ? `/class/${currentClass.code}` : '/class'}
				>
					{router.pathname === '/class/[code]' && (
						<Section>
							<NavTabs />
						</Section>
					)}
					<Section>
						{router.pathname === '/class' ? (
							<React.Fragment>
								<Tooltip title='Thêm lớp học'>
									<IconButton onClick={handleOpen} aria-label='Add Class'>
										<PlusIcon />
									</IconButton>
								</Tooltip>
								<AddClassModal open={isOpen} handleClose={handleClose} />
							</React.Fragment>
						) : (
							<InviteStudentPopup
								classCode={currentClass.code}
								inviteTeacher={currentClass.role === ROLES.owner}
							/>
						)}
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
						<UserOptions isOpen={isOpen} handleClose={handleClose} anchorEl={userRef.current} />
					</Section>
				</Header>
				<Box>{children}</Box>
			</Box>
		</Box>
	);
};

export default withRouter(ClassLayout);
