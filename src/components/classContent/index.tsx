import React, { useContext, useMemo, useEffect, useState } from 'react';

import { NavContext } from '../../store/detailNav';
import { ClassContext } from '../../store/class';
import Members from '../members';
import Banner from '../banner';
import AddAssignMent from '../assignment';
import { GetAllGrades } from '../../api/client';

import { ROLES } from '../../constants';
import { IPointPart } from '../../type';

const ClassContent: React.FC = () => {
	const { currentTab } = useContext(NavContext);
	const { currentClass } = useContext(ClassContext);
	const [grades, setGrades] = useState<IPointPart[]>([]);

	const teachers = useMemo(
		() =>
			currentClass.members.filter(
				(member) => member.detail?.role === ROLES.owner || member.detail?.role === ROLES.teacher
			),
		[currentClass]
	);

	const students = useMemo(
		() => currentClass.members.filter((member) => member.detail?.role === ROLES.student),
		[currentClass]
	);

	const owner = useMemo(
		() => currentClass.members.find((member) => member.detail?.role === 'owner'),
		[currentClass.id]
	);

	useEffect(() => {
		GetAllGrades(currentClass.id).then((data) => setGrades([...data]));
	}, [currentClass.id]);

	switch (currentTab) {
		case 0:
			return <Banner title={currentClass.name} owner={owner && owner.name} />;
		case 1:
			return <AddAssignMent grades={grades} />;
		case 2:
			return <Members members={students} roleType='student' />;
		case 3:
			return <Members members={teachers} roleType='teacher' />;
		default:
			return null;
	}
};

export default ClassContent;
