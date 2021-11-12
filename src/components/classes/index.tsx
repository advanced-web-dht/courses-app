import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import DDDIcon from '@mui/icons-material/MoreVert';
import PlusIcon from '@mui/icons-material/AddCircleOutlined';

import { ClassContext } from '../../store/class';
import { ClassesHeader, ClassesListContainer, ClassesList } from './style';
import Container from '../UI/Container';
import { StyledCard } from './class/style';
import Class from './class';
import AddClassModal from '../addClassModal';
import useToggleModal from '../addClassModal/hook';

const Classes: React.FC = () => {
	const { classes } = useContext(ClassContext);
	const { isOpen, handleOpen, handleClose } = useToggleModal();

	return (
		<Container fixed>
			<ClassesHeader>
				<div>Các lớp đang tham gia</div>
				<IconButton aria-label='classes-options'>
					<DDDIcon />
				</IconButton>
			</ClassesHeader>
			<ClassesListContainer>
				<ClassesList>
					{classes.map((cls) => (
						<Grid key={cls.id} item xs={12} md={6} lg={4} component='li'>
							<Class classData={cls} />
						</Grid>
					))}
					<Grid item xs={12} md={6} lg={4} component='li'>
						<StyledCard className='fake-card' onClick={() => handleOpen()}>
							<div>
								<PlusIcon fontSize='large' />
								<div>Thêm lớp mới</div>
							</div>
						</StyledCard>
					</Grid>
				</ClassesList>
			</ClassesListContainer>
			<AddClassModal open={isOpen} handleClose={handleClose} />
		</Container>
	);
};

export default Classes;
