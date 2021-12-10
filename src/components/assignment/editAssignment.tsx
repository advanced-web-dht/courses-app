import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import XIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';

import { AppState } from '../../reducers';
import { UpdateAssignment } from '../../api/client';
import useInput from '../../hooks/useInput';
import { StyledModal, Form, FormHeader, FormAction, DatePickerModal } from './style';

import { IAssignment } from '../../type';

interface AddAssignmentProps {
	isOpen: boolean;
	handleClose: () => void;
	oldDeadline: Date;
	oldName: string;
	id: number;
	updateAssignmentContext: (targetAssignment: IAssignment) => void;
}

const EditAssignmentModal: React.FC<AddAssignmentProps> = ({ isOpen, handleClose, oldDeadline, oldName, id, updateAssignmentContext }) => {
	const [name, error, setName, setError, resetVal] = useInput(oldName);
	const [dateEnded, setDateEnded] = React.useState<Date>(oldDeadline);

	const [canSubmit, setCanSubmit] = useState(true);
	const { info: currentClass } = useSelector((state: AppState) => state.currentClass);

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

		const result = await UpdateAssignment(currentClass.id, name, dateEnded, id);
		if (result) {
			updateAssignmentContext({ id, name, dateEnded: dateEnded.toString() });
			HandleCloseModal();
			toast.success('Bài tập đã được cập nhật thành công');
		} else {
			toast.error('Cập nhật bài tập không thành công!');
		}

		setCanSubmit(true);
	};

	return (
		<React.Fragment>
			<StyledModal open={isOpen} onClose={handleClose}>
				<Zoom in={isOpen}>
					<Form>
						<FormHeader>
							<div>Cập nhật bài tập</div>
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
								Cập nhật
							</Button>
						</FormAction>
					</Form>
				</Zoom>
			</StyledModal>
		</React.Fragment>
	);
};

export default EditAssignmentModal;
