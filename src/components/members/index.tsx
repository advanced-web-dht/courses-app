import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { CSVDownloader } from 'react-papaparse';
import Button from '@mui/material/Button';

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
  const studentDownload = useMemo(() => members.map((member) => ({ studentId: member.studentId, name: member.name })), []);
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
          {roleType === 'student' && (
            <CSVDownloader data={studentDownload}>
              <Button>Download</Button>
            </CSVDownloader>
          )}
        </React.Fragment>
      ) : (
        <ClassesHeader>
          <div>Chưa có học viên</div>
          {roleType === 'student' && <StudentListPreview />}
        </ClassesHeader>
      )}
    </StyledContainer>
  );
};

export default Members;
