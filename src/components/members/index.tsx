import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { ToastContainer } from 'react-toastify';
import Grid from '@mui/material/Grid';

import DDDIcon from '@mui/icons-material/MoreVert';
import PlusIcon from '@mui/icons-material/AddCircleOutlined';

import { ClassesHeader, ClassesListContainer, ClassesList } from './style';
import StyledContainer from '../UI/Container';
import { StyledCard } from './member/style';
import Member from './member';
import AddClassModal from '../addClassModal';
import useToggleModal from '../../hooks/useToggle';
import { GetAllClasses } from '../../api/client';
import { IClass } from '../../type';

const Members: React.FC = () => {
	const { isOpen, handleOpen, handleClose } = useToggleModal();
	const [classes, setClasses] = useState<IClass[]>([]);

	useEffect(() => {
		GetAllClasses().then((data) => {
			setClasses(data);
		});
	}, []);

	return (
		<StyledContainer fixed>
			<ClassesHeader>
				<div>Danh sách học viên</div>
				<IconButton aria-label='classes-options'>
					<DDDIcon />
				</IconButton>
			</ClassesHeader>
			<ClassesListContainer>
				<ClassesList>
					{classes.map((cls) => (
						<Grid key={cls.id} item xs={12} md={6} lg={4} component='li'>
							<Member classData={cls} />
						</Grid>
					))}
					<Grid item xs={12} md={6} lg={4} component='li'>
						<StyledCard className='fake-card' onClick={() => handleOpen()}>
							<div>
								<PlusIcon fontSize='large' />
								<div>Thêm học viên</div>
							</div>
						</StyledCard>
					</Grid>
				</ClassesList>
			</ClassesListContainer>
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

export default Members;
