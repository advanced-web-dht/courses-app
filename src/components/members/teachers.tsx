import React from 'react';
import Grid from '@mui/material/Grid';

import { ClassesHeader, ClassesListContainer } from './style';
import StyledContainer from '../UI/Container';
import Member from './member';

import { IAccount } from '../../type';

interface MemberProps {
  members: IAccount[];
}

const Teachers: React.FC<MemberProps> = ({ members }) => {
  return (
    <StyledContainer>
      <ClassesHeader>
        <div>Danh sách giảng viên</div>
      </ClassesHeader>
      <ClassesListContainer>
        <Grid component='ul' container spacing={2}>
          {members.map((member, index) => (
            <Grid key={member.studentId ?? index} item xs={12} md={6} lg={4} component='li'>
              <Member member={member} />
            </Grid>
          ))}
        </Grid>
      </ClassesListContainer>
    </StyledContainer>
  );
};

export default Teachers;
