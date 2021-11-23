import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

import { StyledCard, CardContent, CardLabel } from './style';
import { IClassMember } from '../../../type';

interface ClassProps {
	member: IClassMember;
}

const Member: React.FC<ClassProps> = ({ member }) => {
	return (
		<StyledCard background='#edf2f1'>
			<CardContent>
				<Image src='/avatar.svg' width={98} height={98} />
			</CardContent>
			<CardLabel>
				<Typography>{member.name}</Typography>
			</CardLabel>
		</StyledCard>
	);
};

export default Member;
