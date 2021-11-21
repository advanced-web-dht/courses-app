import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import DDDIcon from '@mui/icons-material/MoreVert';

import { StyledCard, CardHeader, CardFooter, ClassTitle } from './style';
import { IClass } from '../../../type';

interface ClassProps {
	classData: IClass;
}

const Class: React.FC<ClassProps> = ({ classData }) => {
	return (
		<Link href={`/class/${classData.code}`} passHref>
			<StyledCard>
				<CardHeader>
					<div>
						<Image src='/class.png' height={60} width={60} alt='class-icon' />
					</div>
					<ClassTitle>
						<Typography variant='h5' className='class-name'>
							{classData.name}
						</Typography>
						<Typography variant='subtitle2'>{classData.code}</Typography>
					</ClassTitle>
				</CardHeader>
				<CardFooter>
					<IconButton aria-label='class-options'>
						<DDDIcon />
					</IconButton>
				</CardFooter>
			</StyledCard>
		</Link>
	);
};

export default Class;
