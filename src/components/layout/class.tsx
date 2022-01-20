import React, { useRef, useState, useEffect } from 'react';
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
import Notification from '../Notification';
import AddClassModal from '../addClassModal';
import useToggle from '../../hooks/useToggle';
import InviteStudentPopup from '../inviteStudentPopup';
import useWindowWidth from '../../hooks/useWindowWidth';
import { ROLES, MOBILE_WIDTH } from '../../constants';

interface ClassLayoutProps {
  router: NextRouter;
  icon: React.ReactNode;
  title: string;
}

const ClassLayout: React.FC<ClassLayoutProps> = ({ children, router, icon, title }) => {
  const userRef = useRef<HTMLButtonElement>(null);
  const { isOpen, handleClose, handleOpen } = useToggle();
  const { isOpen: isOpenUser, handleClose: handleCloseUser, handleOpen: handleOpenUser } = useToggle();
  const { info: currentClass } = useSelector((state: AppState) => state.currentClass);
  const windowWidth = useWindowWidth();
  const [showTab, setShowTab] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (router.pathname === '/class/[code]' && windowWidth >= MOBILE_WIDTH) {
      setShowTab(true);
    } else {
      setShowTab(false);
    }
  }, [router.pathname, windowWidth]);

  useEffect(() => {
    if (router.pathname === '/class') {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [router.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation detail={router.pathname.includes('/class/[code]')} />
      <Box width='100%'>
        <Header icon={icon} title={title} link={isHome ? '/class' : `/class/${currentClass.code}`}>
          {showTab && (
            <Section>
              <NavTabs />
            </Section>
          )}
          <Section>
            {isHome ? (
              <React.Fragment>
                <Tooltip title='Thêm lớp học'>
                  <IconButton onClick={handleOpen} aria-label='Add Class'>
                    <PlusIcon />
                  </IconButton>
                </Tooltip>
                <AddClassModal open={isOpen} handleClose={handleClose} />
              </React.Fragment>
            ) : (
              <InviteStudentPopup classCode={currentClass.code} inviteTeacher={currentClass.role === ROLES.owner} />
            )}
            <Notification />
            <Tooltip title='Tài khoản của bạn'>
              <IconButton size='large' aria-label='user-actions' onClick={() => handleOpenUser()} ref={userRef}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <UserOptions isOpen={isOpenUser} handleClose={handleCloseUser} anchorEl={userRef.current} />
          </Section>
        </Header>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default withRouter(ClassLayout);
