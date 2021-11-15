import React, { useContext } from 'react';

import { NavContext } from '../../store/detailNav';
import Members from '../members';
import Banner from '../banner';

const ClassContent = () => {
	const { currentTab } = useContext(NavContext);

	const Content = currentTab === 0 ? <Banner /> : <Members />;

	return Content;
};

export default ClassContent;
