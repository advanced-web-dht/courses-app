import React from 'react';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { AppState } from '../../reducers';
import Container from '../UI/Container';
import { ClassesHeader } from '../classes/style';
import AddAssignmentModal from './addAssignment';
import useRequest from '../../hooks/useRequest';
import Assignment from './assignment';
import { ListWrapper } from './style';

import { ROLES } from '../../constants';
import { IAssignment } from '../../type';

const Assignments: React.FC = () => {
	const { info: currentClass, grades } = useSelector((state: AppState) => state.currentClass);

	const fetchUrl = `/assignment/${currentClass.id}`;
	const {
		data: assignments,
		mutate,
		response
	} = useRequest<IAssignment[]>(
		{
			url: fetchUrl
		},
		{}
	);

	const handleAddAssignment = async (newAssignment: IAssignment) => {
		const data = [...(assignments as IAssignment[]), newAssignment];
		await mutate({ ...response, data }, false);
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
			<ListWrapper>
				{assignments ? (
					assignments.map((item) => <Assignment assignment={item} key={item.id} />)
				) : (
					<Typography component='span' variant='h6'>
						Chưa có bài tập
					</Typography>
				)}
			</ListWrapper>
		</Container>
	);
};

export default Assignments;
