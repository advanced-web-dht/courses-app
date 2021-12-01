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
import { AddAssignment } from '../../api/client';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import { AddAssignmentButton, StyledModal, Form, FormHeader, FormAction, DatePickerModal } from './style';

import { IAssignment, IPointPart } from '../../type';

interface AddAssignmentProps {
	grades: IPointPart[];
	onAddAssignmentComplete: (newAssignment: IAssignment) => void;
}

const AddAssignmentModal: React.FC<AddAssignmentProps> = ({ grades, onAddAssignmentComplete }) => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	const [name, error, setName, setError, resetVal] = useInput();
	const [dateEnded, setDateEnded] = React.useState<Date>(new Date());
	const [grade, setGrade] = React.useState('');

	const [canSubmit, setCanSubmit] = useState(true);
	const { currentClass } = useContext(ClassContext);

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
			const gradeNum = parseInt(grade, 10);
			const newAssignment = await AddAssignment(currentClass.id, gradeNum, name, dateEnded);
			onAddAssignmentComplete(newAssignment);
			HandleCloseModal();
			toast.success('Bài tập đã được thêm thành công');
		} catch (e) {
			toast.error('Thêm bài tập không thành công!');
		}
		setCanSubmit(true);
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
									{grades.map((gradeItem) => (
										<MenuItem value={gradeItem.id} key={gradeItem.id}>
											{gradeItem.name} - {gradeItem.ratio}%
										</MenuItem>
									))}
								</Select>
								<DatePickerModal
									placeholderText='Hạn nộp'
									selected={dateEnded}
									onChange={(date: Date) => setDateEnded(date)}
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
