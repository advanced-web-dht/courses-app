import React from 'react';
import Grid from '@mui/material/Grid';
import { CSVReader } from 'react-papaparse';
import { ParseResult } from 'papaparse';

import { ClassesHeader, ClassesListContainer } from './style';
import StyledContainer from '../UI/Container';
import Member from './member';
import StudentListPreview from '../studentListPreview';
import { IClassMember } from '../../type';

interface MemberProps {
  members: IClassMember[];
  roleType: string;
}

const Members: React.FC<MemberProps> = ({ members, roleType }) => {
  const handleOnDrop = (data: Array<ParseResult<unknown>>) => {
    console.log(data.map((item) => item.data));
  };

  return (
    <StyledContainer>
      {members.length > 0 ? (
        <React.Fragment>
          <ClassesHeader>
            <div>Danh sách {roleType}</div>
            {roleType === 'student' && <StudentListPreview />}
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
