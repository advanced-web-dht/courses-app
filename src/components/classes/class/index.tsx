import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

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
						<Typography variant='h5' className='class-name' component='span'>
							{classData.name}
						</Typography>
						<Typography variant='body2'>{classData.code}</Typography>
					</ClassTitle>
				</CardHeader>
				<CardFooter />
			</StyledCard>
		</Link>
	);
};

export default Class;
