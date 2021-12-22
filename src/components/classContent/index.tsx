import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../reducers';
import Members from '../members';
import Banner from '../banner';
import Assignments from '../assignment';
import GradeTable from '../grade';

import { ROLES } from '../../constants';

const ClassContent: React.FC = () => {
  const { info, members, currentTab } = useSelector((state: AppState) => state.currentClass);

  const teachers = useMemo(
    () => members.filter((member) => member.detail?.role === ROLES.owner || member.detail?.role === ROLES.teacher),
    [info?.id]
  );

  const students = useMemo(() => members.filter((member) => member.detail?.role === ROLES.student), [info?.id]);

  const owner = useMemo(() => members.find((member) => member.detail?.role === 'owner'), [info?.id]);

  switch (currentTab) {
    case 0:
      return <Banner title={info?.name as string} owner={owner && owner.name} />;
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
