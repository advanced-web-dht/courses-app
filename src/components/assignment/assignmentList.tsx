import React from 'react';
import Typography from '@mui/material/Typography';

import Assignment from './assignment';
import { ListWrapper } from './style';
import { IAssignment } from '../../type';

interface AssignmentListProps {
	assignments: IAssignment[];
	onDeleteAssignment: (id: number) => void;
	onUpdateAssignment: (targetAssignment: IAssignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, onDeleteAssignment, onUpdateAssignment }) => {
	return (
		<ListWrapper>
			{assignments.length > 0 ? (
				assignments.map((item) => (
					<Assignment
						assignment={item}
						key={item.id}
						onDeleteAssignment={onDeleteAssignment}
						onUpdateAssignment={onUpdateAssignment}
					/>
				))
			) : (
				<Typography component='span' variant='h6'>
					Chưa có bài tập
				</Typography>
			)}
		</ListWrapper>
	);
};

export default AssignmentList;
