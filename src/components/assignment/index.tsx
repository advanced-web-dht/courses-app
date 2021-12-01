import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Container from '../UI/Container';
import AddAssignmentModal from '../addAssignmentModal';
import useToggle from '../../hooks/useToggle';
import { Fastfood } from '@mui/icons-material';

const addAssignmentModalWithButton = () => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	return (
		<React.Fragment>
			<Button onClick={handleOpen} aria-label='Add Class'>
				Tạo
			</Button>
			<AddAssignmentModal open={isOpen} handleClose={handleClose} />
		</React.Fragment>
	);
};

const AddClassModalWithButton = memo(addAssignmentModalWithButton);

const AddAssignment: React.FC = () => {
	return (
		<Container>
			<AddClassModalWithButton />
		</Container>
	);
};

export default AddAssignment;
