import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import XIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

import { CustomModal, StyledModal, FormFooter, FormContent } from './style';
import { FormHeader } from '../../../addClassModal/style';
import useInput from '../../../../hooks/useInput';
import { getProfile, updateProfie } from '../../../../api/client/auth';

interface FormProps {
	isOpenForm: boolean;
	close: () => void;
}

const ProfileModal: React.FC<FormProps> = ({ isOpenForm, close }) => {
	const [name, nameError, onChangeName, onNameError, , setName] = useInput();
	const [id, idError, onChangeId, , , setId] = useInput();
	const [canEditId, setCanEditId] = useState(true);

	useEffect(() => {
		(async () => {
			const data = await getProfile();
			setName(data.name);
			if (data.studentId) {
				setId(data.studentId);
				setCanEditId(false);
			}
		})();
	}, []);

	const handleSubmit = async () => {
		if (name.trim().length > 5) {
			const result = await updateProfie(name, id);
			if (!result.message) {
				toast.success('Cập nhật thông tin thành công', { onClose: () => close() });
			} else {
				toast.error(result.message, { onClose: () => close() });
			}
		} else {
			onNameError('Họ tên it nhất 5 ký tự');
		}
	};

	return (
		<>
			<StyledModal open={isOpenForm} onClose={() => close()}>
				<CustomModal>
					<FormHeader>
						<div>Quản lý tài khoản</div>
						<IconButton onClick={() => close()}>
							<XIcon />
						</IconButton>
					</FormHeader>
					<FormContent>
						<TextField
							variant='outlined'
							label='Tên'
							placeholder='Nhập tên'
							color='primary'
							value={name}
							onChange={onChangeName}
							error={nameError.status}
							helperText={nameError.message}
							margin='normal'
						/>
						<TextField
							variant='outlined'
							label='Mã số sinh viên'
							placeholder='Nhập mã số sinh viên'
							color='primary'
							value={id}
							onChange={onChangeId}
							error={idError.status}
							helperText={idError.message}
							margin='normal'
							disabled={!canEditId}
						/>
					</FormContent>
					<FormFooter>
						<Button variant='contained' size='large' onClick={handleSubmit}>
							Cập nhật
						</Button>
					</FormFooter>
				</CustomModal>
			</StyledModal>
		</>
	);
};

export default ProfileModal;
