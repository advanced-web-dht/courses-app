import React, { useContext, useEffect, useState, useMemo } from 'react';

import { NavContext } from '../../store/detailNav';
import { ClassContext } from '../../store/class';
import Members from '../members';
import Banner from '../banner';
import { IClassMember } from '../../type';

const ClassContent: React.FC = () => {
	const { currentTab } = useContext(NavContext);
	const { currentClass } = useContext(ClassContext);
	const [displayMember, setDisplayMember] = useState<IClassMember[]>([]);

	useEffect(() => {
		let members;
		switch (currentTab) {
			case 1:
				members = currentClass.members?.filter((member: IClassMember) => member.detail?.role === 'student');
				setDisplayMember(members as IClassMember[]);
				break;
			case 2:
				members = currentClass.members?.filter(
					(member: IClassMember) => member.detail?.role === 'teacher' || member.detail?.role === 'owner'
				);
				setDisplayMember(members as IClassMember[]);
				break;
			default:
				break;
		}
	}, [currentTab, currentClass]);

	const owner = useMemo(
		() => currentClass.members.find((member) => member.detail?.role === 'owner'),
		[currentClass.id]
	);

	return currentTab === 0 ? (
		<Banner title={currentClass.name} owner={owner && owner.name} />
	) : (
		<Members members={displayMember} role={currentTab === 1 ? 'student' : 'teacher'} />
	);
};

export default ClassContent;
