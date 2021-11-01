import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Grow';

import PlusIcon from '@mui/icons-material/Add';
import XIcon from '@mui/icons-material/Close';

import { StyledModal, Form, FormHeader, FormAction } from './style';

const AddClassModal: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<React.Fragment>
			<IconButton onClick={handleOpen}>
				<PlusIcon />
			</IconButton>
			<StyledModal open={isOpen} onClose={handleClose}>
				<Zoom in={isOpen}>
					<Form>
						<FormHeader>
							<div>Tạo lớp học</div>
							<IconButton onClick={handleClose}>
								<XIcon />
							</IconButton>
						</FormHeader>
						<FormAction component='form'>
							<TextField label='Tên lớp học' variant='outlined' color='success' />
							<TextField label='Chủ đề' variant='outlined' color='success' />
							<Button variant='outlined'>Tạo</Button>
						</FormAction>
					</Form>
				</Zoom>
			</StyledModal>
		</React.Fragment>
	);
};

export default AddClassModal;
