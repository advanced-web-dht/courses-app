import React from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

import DDDIcon from '@mui/icons-material/MoreVert';

import { ClassesHeader } from './style';

import { IClass } from '../../type';

interface ClassesProps {
	classes: IClass[];
}

const Classes: React.FC<ClassesProps> = ({ classes }) => {
	return (
		<Container fixed sx={{ mt: '80px' }}>
			<ClassesHeader>
				<div>Các lớp đang tham gia</div>
				<IconButton>
					<DDDIcon />
				</IconButton>
			</ClassesHeader>
		</Container>
	);
};

export default Classes;
