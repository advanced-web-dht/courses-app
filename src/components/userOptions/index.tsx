import React from 'react';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { signout, useSession } from 'next-auth/client';

import Form from '../profileModal';
import useToggle from '../../hooks/useToggle';

interface UserOptionsProps {
  isOpen: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
}

const UserOptions: React.FC<UserOptionsProps> = ({ isOpen, handleClose, anchorEl }) => {
  const handleSignOut = async () => {
    await signout({ callbackUrl: `${window.location.origin}/signin` });
  };
  const [session] = useSession();
  const { isOpen: isOpenForm, handleClose: handleCloseForm, handleOpen } = useToggle();

  return (
    <React.Fragment>
      <Menu open={isOpen} TransitionComponent={Fade} onClose={() => handleClose()} anchorEl={anchorEl}>
        <MenuItem>
          <Typography textAlign='center'>Hello, {session?.user?.name?.split(' ')[0]}</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleOpen()}>
          <ListItemIcon>
            <PermIdentityIcon fontSize='small' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
        <MenuItem>
          <Link href='/enroll'>
            <a>
              <ListItemIcon>
                <Login fontSize='small' />
              </ListItemIcon>
              Ghi danh
            </a>
          </Link>
        </MenuItem>
      </Menu>
      <Form isOpenForm={isOpenForm} close={handleCloseForm} />
    </React.Fragment>
  );
};

export default UserOptions;
