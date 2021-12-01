import React, { useRef, useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIcon from '@mui/icons-material/AssignmentRounded';
import IconButton from '@mui/material/IconButton';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { toast } from 'react-toastify';

import useToggle from '../../hooks/useToggle';
import { DeleteAssignment } from '../../api/client';
import { AssignmentItem, AssignmentItemTitle, AssignmentItemAction } from './style';
import { IAssignment } from '../../type';
import { ClassContext } from '../../store/class';
import EditAssignmentModal from './editAssignment';

interface AssignmentProps {
	assignment: IAssignment;
	onDeleteAssignment: (id: number) => void;
	onUpdateAssignment: (targetAssignment: IAssignment) => void;
}

const Assignment: React.FC<AssignmentProps> = ({ assignment, onDeleteAssignment, onUpdateAssignment }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const { isOpen, handleOpen, handleClose } = useToggle();
	const [isEdit, setIsEdit] = useState(false);

	const { currentClass } = useContext(ClassContext);

	const date = new Date(assignment.dateEnded);

	const handleDeleteAssignment = async () => {
		const result = await DeleteAssignment(currentClass.id, assignment.id);
		if (result) {
			onDeleteAssignment(assignment.id);
			toast.success('Xoá bài tập thành công');
		} else {
			toast.error('Xoá không thành công');
		}
	};

	return (
		<AssignmentItem>
			<AssignmentItemTitle>
				<AssignmentIcon fontSize='large' />
				<span>{assignment.name}</span>
			</AssignmentItemTitle>
			<AssignmentItemAction>
				<span>
					Đến hạn {date.toLocaleDateString()} | {date.toLocaleTimeString()}
				</span>
				<IconButton ref={buttonRef} onClick={handleOpen}>
					<MoreVertRoundedIcon />
				</IconButton>
			</AssignmentItemAction>
			<Menu
				aria-labelledby='demo-positioned-button'
				anchorEl={buttonRef.current}
				open={isOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<MenuItem onClick={handleDeleteAssignment}>Xoá</MenuItem>
				<MenuItem onClick={() => setIsEdit(true)}>Cập nhật</MenuItem>
			</Menu>
			<EditAssignmentModal
				isOpen={isEdit}
				handleClose={() => setIsEdit(false)}
				onUpdateAssignmentComplete={onUpdateAssignment}
				oldDeadline={new Date(assignment.dateEnded)}
				oldName={assignment.name}
				id={assignment.id}
			/>
		</AssignmentItem>
	);
};

export default Assignment;
