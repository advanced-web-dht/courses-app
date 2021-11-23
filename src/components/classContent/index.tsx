import React, { useContext, useEffect, useState } from 'react';

import { NavContext } from '../../store/detailNav';
import Members from '../members';
import Banner from '../banner';
import { IClass, IClassMember } from '../../type';

interface ClassContentProps {
	classData: IClass;
}

const ClassContent: React.FC<ClassContentProps> = ({ classData }) => {
	const { currentTab } = useContext(NavContext);
	const [displayMember, setDisplayMember] = useState<IClassMember[]>([]);

	useEffect(() => {
		let members;
		switch (currentTab) {
			case 1:
				members = classData.members.filter((member: IClassMember) => member.details?.role === 'student');
				setDisplayMember(members);
				break;
			case 2:
				members = classData.members.filter(
					(member: IClassMember) => member.details?.role === 'teacher' || member.details?.role === 'owner'
				);
				setDisplayMember(members);
				break;
			default:
				break;
		}
	}, [currentTab]);

	const Content =
		currentTab === 0 ? (
			<Banner title={classData.name} code={classData.code} />
		) : (
			<Members members={displayMember} role={currentTab === 1 ? 'student' : 'teacher'} />
		);

	return Content;
};

export default ClassContent;
