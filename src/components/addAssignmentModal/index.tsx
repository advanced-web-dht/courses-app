import React, { useRef, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';

import XIcon from '@mui/icons-material/Close';

import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ClassContext } from '../../store/class';
import { StyledModal, Form, FormHeader, FormAction, DatePickerModal } from './style';
import { AddNewClass } from '../../api/client';
import useInput from '../../hooks/useInput';

interface ModalProps {
	open: boolean;
	handleClose: () => void;
}

const AddAssignmentModal: React.FC<ModalProps> = ({ open, handleClose }) => {
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
			setError('Tên bài tập ít nhất 6 ký tự!');
			inputRef.current?.focus();
			setCanSubmit(true);
			return;
		}
		try {
			const newClass = await AddNewClass({ name });
			AddClass(newClass);
			HandleCloseModal();
			toast.success('Bài tập đã được thêm thành công');
		} catch (e) {
			toast.error('Thêm bài tập không thành công!');
		}
		setCanSubmit(true);
	};

	const HandleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			await HandleSubmit();
		}
	};

	const [grade, setGrade] = React.useState('');

	const handleChange = (event: SelectChangeEvent) => {
		setGrade(event.target.value as string);
	};

	const [startDate, setStartDate] = React.useState<Date | null>(null);

	return (
		<StyledModal open={open} onClose={HandleCloseModal}>
			<Zoom in={open}>
				<Form>
					<FormHeader>
						<div>Tạo bài tập</div>
						<IconButton onClick={HandleCloseModal}>
							<XIcon />
						</IconButton>
					</FormHeader>
					<FormAction component='form'>
						<TextField
							required
							variant='outlined'
							label='Tiêu đề'
							placeholder='Tiêu đề'
							color='primary'
							value={name}
							onChange={setName}
							error={error.status}
							helperText={error.message}
							inputRef={inputRef}
							onKeyDown={HandleKeyPress}
							autoFocus
							margin='normal'
						/>
						<FormControl fullWidth margin='normal'>
							<InputLabel id='select-label'>Điểm</InputLabel>
							<Select
								labelId='select-label'
								id='simple-select'
								value={grade}
								label='Điểm'
								onChange={handleChange}
							>
								<MenuItem value={20}>20%</MenuItem>
								<MenuItem value={30}>30%</MenuItem>
								<MenuItem value={50}>50%</MenuItem>
							</Select>
							<DatePickerModal
								placeholderText='Hạn nộp'
								selected={startDate}
								onChange={(date: Date) => setStartDate(date)}
								timeInputLabel='Time:'
								dateFormat='MM/dd/yyyy h:mm aa'
								showTimeInput
							/>
						</FormControl>
						<Button variant='contained' color='primary' onClick={HandleSubmit} disabled={!canSubmit}>
							Tạo
						</Button>
					</FormAction>
				</Form>
			</Zoom>
		</StyledModal>
	);
};

export default AddAssignmentModal;
