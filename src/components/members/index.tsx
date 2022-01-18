import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { CSVDownloader } from 'react-papaparse';
import Button from '@mui/material/Button';

import { ClassesHeader, ClassesListContainer } from './style';
import StyledContainer from '../UI/Container';
import Member from './member';
import StudentListPreview from '../studentListPreview';
import { IAccount, IStudent } from '../../type';

interface MemberProps {
  members: IAccount[] | IStudent[];
  roleType: string;
}

const displayRole: Record<string, string> = {
  teacher: 'giảng viên',
  student: 'học viên'
};

const Members: React.FC<MemberProps> = ({ members, roleType }) => {
  const studentDownload = useMemo(() => members.map((member) => ({ studentId: member.studentId, name: member.name })), []);
  return (
    <StyledContainer>
      {members.length > 0 ? (
        <React.Fragment>
          <ClassesHeader>
            <div>Danh sách {displayRole[roleType]}</div>
            {roleType === 'student' && <StudentListPreview />}
          </ClassesHeader>
          <ClassesListContainer>
            <Grid component='ul' container spacing={2}>
              {members.map((member, index) => (
                <Grid key={member.studentId ?? index} item xs={12} md={6} lg={4} component='li'>
                  <Member member={member} type={roleType} />
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
