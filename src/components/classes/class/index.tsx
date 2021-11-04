import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import DDDIcon from '@mui/icons-material/MoreVert';

import { StyledCard, CardHeader, CardFooter } from './style';
import { IClass } from '../../../type';

interface ClassProps {
	classData: IClass;
}

const Class: React.FC<ClassProps> = ({ classData }) => {
	return (
		<StyledCard>
			<CardHeader>
				<div>
					<Image src='/class.png' height={60} width={60} alt='class-icon' />
				</div>
				<div className='class-title'>
					<Typography variant='h5' className='class-name'>
						{classData.name}
					</Typography>
					<Typography variant='subtitle2'>{classData.code}</Typography>
				</div>
			</CardHeader>
			<CardFooter>
				<IconButton aria-label='class-options'>
					<DDDIcon />
				</IconButton>
			</CardFooter>
		</StyledCard>
	);
};

export default Class;
