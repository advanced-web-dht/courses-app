import React, { useMemo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../reducers';
import Members from '../members';
import Banner from '../banner';
import AddAssignment from '../assignment';
import { GetAllGrades } from '../../api/client';

import { ROLES } from '../../constants';
import { IPointPart } from '../../type';

const ClassContent: React.FC = () => {
	const { info, members, currentTab } = useSelector((state: AppState) => state.currentClass);

	const [grades, setGrades] = useState<IPointPart[]>([]);

	const teachers = useMemo(
		() => members.filter((member) => member.detail?.role === ROLES.owner || member.detail?.role === ROLES.teacher),
		[info?.id]
	);

	const students = useMemo(() => members.filter((member) => member.detail?.role === ROLES.student), [info?.id]);

	const owner = useMemo(() => members.find((member) => member.detail?.role === 'owner'), [info?.id]);

	useEffect(() => {
		GetAllGrades(info?.id as number).then((data) => setGrades([...data]));
	}, [info?.id]);

	switch (currentTab) {
		case 0:
			return <Banner title={info?.name as string} owner={owner && owner.name} />;
		case 1:
			return <AddAssignment grades={grades} />;
		case 2:
			return <Members members={students} roleType='student' />;
		case 3:
			return <Members members={teachers} roleType='teacher' />;
		default:
			return null;
	}
};

export default ClassContent;
