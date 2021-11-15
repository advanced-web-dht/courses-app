import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

import { StyledCard, CardContent, CardLabel } from './style';
import { IClass } from '../../../type';

interface ClassProps {
	classData: IClass;
}

const Member: React.FC<ClassProps> = ({ classData }) => {
	return (
		<StyledCard>
			<CardContent>
				<Image src='/avatar.svg' width={98} height={98} />
			</CardContent>
			<CardLabel>
				<Typography>Tan Pham (you)</Typography>
			</CardLabel>
		</StyledCard>
	);
};

export default Member;
