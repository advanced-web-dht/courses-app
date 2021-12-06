import React, { useRef, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import GroupAddRounded from '@mui/icons-material/GroupAddRounded';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';

import { InviteStudent } from '../../api/client';
import useToggle from '../../hooks/useToggle';
import useInput from '../../hooks/useInput';
import RoundedButton from '../UI/RoundedButton';
import { PopupBox, PopupActions } from './style';
import { EMAIL_CHECK } from '../../constants';

interface Props {
	classCode: string;
	inviteTeacher?: boolean;
}

const InviteStudentPopup: React.FC<Props> = ({ classCode, inviteTeacher }) => {
	const { isOpen, handleClose, handleOpen } = useToggle();
	const [canSubmit, setCanSubmit] = useState(true);
	const [isTeacher, setIsTeacher] = useState(false);
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
		if (!canSubmit) return;
		setCanSubmit(false);
		if (email && !error.status) {
			const result = await InviteStudent(classCode, email, isTeacher);
			if (result) {
				toast.success('Đã mời thành công');
				resetValue();
				handleClose();
			} else {
				toast.error('Đã có lỗi xảy ra!');
			}
		}
		setCanSubmit(true);
	};

	const HandleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			await handleSubmit();
		}
	};

	return (
		<React.Fragment>
			<Tooltip title='Thêm thành viên mới'>
				<IconButton onClick={() => handleOpen()} size='large' ref={anchorRef}>
					<GroupAddRounded />
				</IconButton>
			</Tooltip>
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
						onKeyDown={HandleKeyPress}
					/>
					<PopupActions>
						{inviteTeacher && (
							<FormControlLabel
								control={
									<Checkbox
										size='small'
										value={isTeacher}
										onChange={() => {
											setIsTeacher(!isTeacher);
										}}
									/>
								}
								label='Giảng viên'
							/>
						)}
						<RoundedButton onClick={handleSubmit} variant='contained' size='small'>
							Mời
						</RoundedButton>
					</PopupActions>
				</PopupBox>
			</Popover>
		</React.Fragment>
	);
};

InviteStudentPopup.defaultProps = {
	inviteTeacher: false
};

export default InviteStudentPopup;
