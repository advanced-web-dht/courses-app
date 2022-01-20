import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../reducers';
import Students from '../members';
import Teachers from '../members/teachers';
import Banner from '../banner';
import GradeTable from '../grade';
import StudentGrade from '../grade/studentGrade';

const ClassContent: React.FC = () => {
  const { info, students, teachers, currentTab, grades } = useSelector((state: AppState) => state.currentClass);

  const allTeachers = useMemo(() => [info.owner, ...teachers], [teachers.length]);

  switch (currentTab) {
    case 0:
      return (
        <Banner
          title={info?.name as string}
          owner={info.owner.name}
          grades={grades}
          students={students.length}
          teachers={teachers.length}
        />
      );
    case 1:
      return <Students members={students} role={info.role} />;
    case 2:
      return <Teachers members={allTeachers} />;
    case 3:
      return info.role === 'student' ? <StudentGrade /> : <GradeTable />;
    default:
      return null;
  }
};

export default ClassContent;
