import React from 'react';

import Container from '../UI/Container';
import { ClassesHeader } from '../classes/style';
import AddAssignmentModal from '../addAssignmentModal';

const AddAssignment: React.FC = () => {
	return (
		<Container>
			<ClassesHeader>
				<AddAssignmentModal />
			</ClassesHeader>
		</Container>
	);
};

export default AddAssignment;
