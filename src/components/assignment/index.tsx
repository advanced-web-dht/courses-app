import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';

import { AppState } from '../../reducers';
import Container from '../UI/Container';
import { ClassesHeader } from '../classes/style';
import AddAssignmentModal from './addAssignment';
import AssignmentList from './assignmentList';
import { GetAllAssignments } from '../../api/client';

import { ROLES } from '../../constants';
import { IAssignment, IPointPart } from '../../type';

interface AddAssignmentProps {
	grades: IPointPart[];
}

const AddAssignment: React.FC<AddAssignmentProps> = ({ grades }) => {
	const { info: currentClass } = useSelector((state: AppState) => state.currentClass);
	const [assignments, setAssignments] = useState<IAssignment[]>([]);

	useEffect(() => {
		GetAllAssignments(currentClass.id).then((data) => setAssignments([...data]));
	}, []);

	const handleAddAssignment = (newAssignment: IAssignment) => setAssignments((prev) => [...prev, newAssignment]);

	const handleDeleteAssignment = (id: number) => setAssignments((prev) => prev.filter((item) => item.id !== id));

	const handleUpdateAssignment = (targetAssignment: IAssignment) => {
		const newAssignments = assignments.filter((item) => item.id !== targetAssignment.id);
		setAssignments([...newAssignments, targetAssignment]);
	};

	return (
		<Container>
			<ClassesHeader>
				{currentClass.role === ROLES.student ? (
					<div>Bài tập tại lớp</div>
				) : (
					<AddAssignmentModal grades={grades} onAddAssignmentComplete={handleAddAssignment} />
				)}
			</ClassesHeader>
			<Divider />
			<AssignmentList
				assignments={assignments}
				onDeleteAssignment={handleDeleteAssignment}
				onUpdateAssignment={handleUpdateAssignment}
			/>
		</Container>
	);
};

export default AddAssignment;
