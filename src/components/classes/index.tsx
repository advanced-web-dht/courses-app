import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import PlusIcon from '@mui/icons-material/AddCircleOutlined';

import { AppState } from '../../reducers';
import { ClassesHeader, ClassesListContainer } from './style';
import Container from '../UI/Container';
import { FakeCard } from './class/style';
import Class from './class';
import AddClassModal from '../addClassModal';
import useToggle from '../../hooks/useToggle';

const Classes: React.FC = () => {
	const { list: classes } = useSelector((state: AppState) => state.classes);
	const { isOpen, handleOpen, handleClose } = useToggle();

	return (
		<Container>
			<ClassesHeader>
				<div>Các lớp đang tham gia</div>
			</ClassesHeader>
			<ClassesListContainer>
				<Grid component='ol' container spacing={2}>
					{classes.map((cls) => (
						<Grid key={cls.id} item xs={12} md={6} lg={4} component='li'>
							<Class classData={cls} />
						</Grid>
					))}
					<Grid item xs={12} md={6} lg={4} component='li'>
						<FakeCard onClick={() => handleOpen()}>
							<PlusIcon fontSize='large' />
							<div>Thêm lớp mới</div>
						</FakeCard>
					</Grid>
				</Grid>
			</ClassesListContainer>
			<AddClassModal open={isOpen} handleClose={handleClose} />
		</Container>
	);
};

export default Classes;
