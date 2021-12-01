import React, { useState, useContext } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import { ClassContext } from '../../store/class';
import { StyledModal, Form, FormHeader, FormAction, DatePickerModal } from './style';
import { AddNewClass } from '../../api/client';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import { AddAssignmentButton } from '../assignment/style';

const AddAssignmentModal: React.FC = () => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	const [name, error, setName, setError, resetVal] = useInput();
	const [startDate, setStartDate] = React.useState<Date>(new Date());
	const [grade, setGrade] = React.useState('');

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

	const handleChange = (event: SelectChangeEvent) => {
		setGrade(event.target.value as string);
	};

	return (
		<React.Fragment>
			<AddAssignmentButton onClick={handleOpen} aria-label='add assignment' color='secondary' variant='contained'>
				<FontAwesomeIcon icon={faPlus} />
				<span>Tạo</span>
			</AddAssignmentButton>
			<StyledModal open={isOpen} onClose={handleClose}>
				<Zoom in={isOpen}>
					<Form>
						<FormHeader>
							<div>Tạo bài tập</div>
							<IconButton onClick={handleClose}>
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
		</React.Fragment>
	);
};

export default AddAssignmentModal;
