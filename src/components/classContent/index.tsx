import React, { useContext } from 'react';

import { NavContext } from '../../store/detailNav';
import Members from '../members';
import Banner from '../banner';
import { IClass } from '../../type';

interface ClassContentProps {
	classData: IClass;
}

const ClassContent: React.FC<ClassContentProps> = ({ classData }) => {
	const { currentTab } = useContext(NavContext);

	const Content = currentTab === 0 ? <Banner title={classData.name} code={classData.code} /> : <Members />;

	return Content;
};

export default ClassContent;
