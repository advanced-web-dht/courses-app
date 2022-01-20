import React from 'react';
import Grid from '@mui/material/Grid';

import { ClassesHeader, ClassesListContainer } from './style';
import StyledContainer from '../UI/Container';
import Member from './member';
import Downloader from './downloader';
import StudentListPreview from '../studentListPreview';
import { IStudent } from '../../type';

interface MemberProps {
  members: IStudent[];
  role: string;
}

/**
 * @note Student list
 * @param members
 * @param role
 * @constructor
 */

const Students: React.FC<MemberProps> = ({ members, role }) => {
  return (
    <StyledContainer>
      {members.length > 0 ? (
        <React.Fragment>
          <ClassesHeader>
            <div>Danh sách học viên {role !== 'student' && <Downloader />}</div>
            {role !== 'student' && <StudentListPreview />}
          </ClassesHeader>
          <ClassesListContainer>
            <Grid component='ul' container spacing={2}>
              {members.map((member, index) => (
                <Grid key={member.studentId ?? index} item xs={12} md={6} lg={4} component='li'>
                  <Member member={member} type='student' />
                </Grid>
              ))}
            </Grid>
          </ClassesListContainer>
        </React.Fragment>
      ) : (
        <ClassesHeader>
          <div>Chưa có học viên</div>
          {role !== 'student' && <StudentListPreview />}
        </ClassesHeader>
      )}
    </StyledContainer>
  );
};

export default Students;
