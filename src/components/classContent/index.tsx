import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../reducers';
import Members from '../members';
import Banner from '../banner';
import Assignments from '../assignment';
import GradeTable from '../grade';

const ClassContent: React.FC = () => {
  const { info, students, teachers, currentTab } = useSelector((state: AppState) => state.currentClass);

  switch (currentTab) {
    case 0:
      return <Banner title={info?.name as string} owner={info.owner.name} />;
    case 1:
      return <Assignments />;
    case 2:
      return <Members members={students} roleType='student' />;
    case 3:
      return <Members members={teachers} roleType='teacher' />;
    case 4:
      return <GradeTable />;
    default:
      return null;
  }
};

export default ClassContent;
