import React, { useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import GroupAddRounded from '@mui/icons-material/GroupAddRounded';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

import { InviteStudent } from '../../api/client';
import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';
import RoundedButton from '../UI/RoundedButton';
import PopupBox from './style';
import { EMAIL_CHECK } from '../../constants';

interface Props {
	classCode: string;
}

const InviteStudentPopup: React.FC<Props> = ({ classCode }) => {
	const { isOpen, handleClose, handleOpen } = useToggle();
	const anchorRef = useRef<HTMLButtonElement>(null);

	const [email, error, handleChangeEmail, handleError, resetValue] = useInput();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (email) {
				if (!EMAIL_CHECK.test(email)) {
					handleError('Email không hợp lệ');
				}
			}
		}, 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, [email]);

	const handleSubmit = async () => {
		if (email) {
			const result = await InviteStudent(classCode, email);
			if (result) {
				toast.success('Đã mời thành công');
				resetValue();
				handleClose();
			} else {
				toast.error('Đã có lỗi xảy ra!');
			}
		}
	};

	return (
		<React.Fragment>
			<IconButton onClick={() => handleOpen()} size='large' ref={anchorRef}>
				<GroupAddRounded />
			</IconButton>
			<Popover
				open={isOpen}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<PopupBox>
					<TextField
						value={email}
						onChange={handleChangeEmail}
						error={error.status}
						helperText={error.message}
						label='Email'
					/>
					<RoundedButton onClick={handleSubmit} variant='contained'>
						Mời
					</RoundedButton>
				</PopupBox>
			</Popover>
		</React.Fragment>
	);
};

export default InviteStudentPopup;
