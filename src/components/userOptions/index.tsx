import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Fade from '@mui/material/Fade';
import { signout } from 'next-auth/client';
import Form from '../members/member/memberForm';
import useToggle from '../../hooks/useToggle';

interface UserOptionsProps {
	isOpen: boolean;
	handleClose: () => void;
	anchorEl: HTMLElement | null;
}

const UserOptions: React.FC<UserOptionsProps> = ({ isOpen, handleClose, anchorEl }) => {
	const handleSignOut = async () => {
		await signout();
	};

	// const [isOpenForm, setIsOpenForm] = useState(false);

	// const openFormHanlder = () => {
	// 	setIsOpenForm(true);
	// };

	// const closeFormHanlder = () => {
	// 	setIsOpenForm(false);
	// };

	const { isOpen: isOpenForm, handleClose: handleCloseForm, handleOpen } = useToggle();

	return (
		<Menu open={isOpen} TransitionComponent={Fade} onClose={() => handleClose()} anchorEl={anchorEl}>
			<MenuItem onClick={() => handleOpen()}>
				<ListItemIcon>
					<PermIdentityIcon fontSize='small' />
				</ListItemIcon>
				Hồ sơ
				<Form isOpenForm={isOpenForm} close={handleCloseForm} />
			</MenuItem>
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
