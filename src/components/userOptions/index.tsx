import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Fade from '@mui/material/Fade';
import { signout } from 'next-auth/client';

interface UserOptionsProps {
	isOpen: boolean;
	handleClose: () => void;
	anchorEl: HTMLElement | null;
}

const UserOptions: React.FC<UserOptionsProps> = ({ isOpen, handleClose, anchorEl }) => {
	const handleSignOut = async () => {
		await signout({ callbackUrl: `${window.location.origin}/signin` });
	};

	return (
		<Menu open={isOpen} TransitionComponent={Fade} onClose={() => handleClose()} anchorEl={anchorEl}>
			<MenuItem onClick={handleSignOut}>
				<ListItemIcon>
					<Logout fontSize='small' />
				</ListItemIcon>
				Đăng xuất
			</MenuItem>
		</Menu>
	);
};

export default UserOptions;
