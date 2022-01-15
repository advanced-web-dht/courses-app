import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../reducers';
import Members from '../members';
import Banner from '../banner';
import Assignments from '../assignment';
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
      return <Assignments />;
    case 2:
      return <Members members={students} roleType='student' />;
    case 3:
      return <Members members={allTeachers} roleType='teacher' />;
    case 4:
      return info.role === 'student' ? <StudentGrade /> : <GradeTable />;
    default:
      return null;
  }
};

export default ClassContent;
