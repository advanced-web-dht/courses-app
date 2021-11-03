import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { ToastContainer } from 'react-toastify';

import DDDIcon from '@mui/icons-material/MoreVert';
import PlusIcon from '@mui/icons-material/AddCircleOutlined';

import { ClassContext } from '../../store/class';
import { StyledContainer, ClassesHeader, ClassesList } from './style';
import { StyledCard } from './class/style';
import Class from './class';
import AddClassModal from '../addClassModal';
import useToggleModal from '../addClassModal/hook';

const Classes: React.FC = () => {
	const { classes } = useContext(ClassContext);
	const { isOpen, handleOpen, handleClose } = useToggleModal();

	return (
		<StyledContainer fixed>
			<ClassesHeader>
				<div>Các lớp đang tham gia</div>
				<IconButton>
					<DDDIcon />
				</IconButton>
			</ClassesHeader>
			<ClassesList>
				{classes.map((cls) => (
					<Class classData={cls} key={cls.id} />
				))}
				<StyledCard className='fake-card' onClick={() => handleOpen()}>
					<div>
						<PlusIcon fontSize='large' />
						<div>Thêm lớp mới</div>
					</div>
				</StyledCard>
			</ClassesList>
			<AddClassModal open={isOpen} handleClose={handleClose} />
			<ToastContainer
				position='bottom-right'
				autoClose={4000}
				newestOnTop={false}
				draggable={false}
				closeOnClick
				pauseOnHover
			/>
		</StyledContainer>
	);
};

export default Classes;
