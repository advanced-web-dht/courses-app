import React from 'react';
import Grid from '@mui/material/Grid';

import { ClassesHeader, ClassesListContainer } from './style';
import StyledContainer from '../UI/Container';
import Member from './member';
import { IClassMember } from '../../type';

interface MemberProps {
	members: IClassMember[];
	roleType: string;
}

const Members: React.FC<MemberProps> = ({ members, roleType }) => {
	return (
		<StyledContainer>
			{members.length > 0 ? (
				<React.Fragment>
					<ClassesHeader>
						<div>Danh sách {roleType}</div>
					</ClassesHeader>
					<ClassesListContainer>
						<Grid component='ul' container spacing={2}>
							{members.map((member) => (
								<Grid key={member.id} item xs={12} md={6} lg={4} component='li'>
									<Member member={member} />
								</Grid>
							))}
						</Grid>
					</ClassesListContainer>
				</React.Fragment>
			) : (
				<ClassesHeader>
					<div>Chưa có học viên</div>
				</ClassesHeader>
			)}
		</StyledContainer>
	);
};

export default Members;
