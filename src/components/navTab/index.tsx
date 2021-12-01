import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { NavContext } from '../../store/detailNav';
import NavBar from './style';

const NavTabs: React.FC = () => {
	const { currentTab, changeTab } = useContext(NavContext);

	return (
		<NavBar>
			<Tabs value={currentTab} aria-label='nav tabs example'>
				<Tab label='Bảng tin' onClick={() => changeTab(0)} />
				<Tab label='Bài tập' onClick={() => changeTab(1, 'assignments')} />
				<Tab label='Học viên' onClick={() => changeTab(2, 'students')} />
				<Tab label='Giảng viên' onClick={() => changeTab(3, 'teachers')} />
			</Tabs>
		</NavBar>
	);
};

export default NavTabs;
