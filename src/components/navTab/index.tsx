import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { NavContext } from '../../store/detailNav';
import NavBar from './style';

const NavTabs: React.FC = () => {
	const { currentTab, changeTab } = useContext(NavContext);

	return (
		<NavBar sx={{ width: '100%' }}>
			<Tabs value={currentTab} aria-label='nav tabs example'>
				<Tab label='Bảng tin' onClick={() => changeTab(0)} />
				<Tab label='Học viên' onClick={() => changeTab(1)} />
				<Tab label='Giảng viên' onClick={() => changeTab(2)} />
			</Tabs>
		</NavBar>
	);
};

export default NavTabs;
