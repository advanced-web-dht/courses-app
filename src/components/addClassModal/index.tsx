import React, { useRef, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';

import XIcon from '@mui/icons-material/Close';

import { ClassContext } from '../../store/class';
import { StyledModal, Form, FormHeader, FormAction } from './style';
import { AddNewClass } from '../../api/client';
import useInput from '../../hooks/useInput';

interface ModalProps {
	open: boolean;
	handleClose: () => void;
}

const AddClassModal: React.FC<ModalProps> = ({ open, handleClose }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [name, error, setName, setError, resetVal] = useInput();
	const [canSubmit, setCanSubmit] = useState(true);
	const { AddClass } = useContext(ClassContext);

	const HandleCloseModal = () => {
		resetVal();
		handleClose();
	};

	const HandleSubmit = async () => {
		setCanSubmit(false);
		if (name.length < 6) {
			setError('Tên lớp ít nhất 6 ký tự!');
			inputRef.current?.focus();
			setCanSubmit(true);
			return;
		}
		try {
			const newClass = await AddNewClass({ name });
			AddClass(newClass);
			HandleCloseModal();
			toast.success('Lớp học đã được thêm thành công');
		} catch (e) {
			toast.error('Thêm lớp học không thành công!');
		}
		setCanSubmit(true);
	};

	const HandleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			await HandleSubmit();
		}
	};

	return (
		<StyledModal open={open} onClose={HandleCloseModal}>
			<Zoom in={open}>
				<Form>
					<FormHeader>
						<div>Tạo lớp học</div>
						<IconButton onClick={HandleCloseModal}>
							<XIcon />
						</IconButton>
					</FormHeader>
					<FormAction component='form'>
						<TextField
							required
							variant='outlined'
							label='Tên lớp học'
							placeholder='Tên lớp học'
							color='primary'
							value={name}
							onChange={setName}
							error={error.status}
							helperText={error.message}
							inputRef={inputRef}
							onKeyDown={HandleKeyPress}
							autoFocus
						/>
						<Button variant='contained' color='primary' onClick={HandleSubmit} disabled={!canSubmit}>
							Tạo
						</Button>
					</FormAction>
				</Form>
			</Zoom>
		</StyledModal>
	);
};

export default AddClassModal;
