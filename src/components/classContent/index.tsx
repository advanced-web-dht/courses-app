import React, { useContext, useEffect, useState } from 'react';

import { NavContext } from '../../store/detailNav';
import Members from '../members';
import Banner from '../banner';
import { IClass, IClassMember } from '../../type';
import AddAssignMent from '../assignment';

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

	let Content;
	if (currentTab === 0) {
		Content = <Banner title={classData.name} code={classData.code} />;
	} else if (currentTab === 1) {
		Content = <AddAssignMent />;
	} else {
		Content = <Members members={displayMember} role={currentTab === 2 ? 'student' : 'teacher'} />;
	}

	return Content;
};

export default ClassContent;
