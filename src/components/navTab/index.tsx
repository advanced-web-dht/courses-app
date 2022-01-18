import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AppState } from '../../reducers';
import { changeTab } from './action';
import NavBar from './style';

const NavRoutes: Record<string, number> = {
  '#students': 1,
  '#teachers': 2,
  '#grades': 3
};

const NavTabs: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state: AppState) => state.currentClass);
  const router = useRouter();

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const target = NavRoutes[hash];
      dispatch(changeTab(target));
    } else {
      dispatch(changeTab(0));
    }
  }, []);

  // handle change tab to push to history
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const target = NavRoutes[hash];
        dispatch(changeTab(target));
      } else {
        dispatch(changeTab(0));
      }
    };

    router.events.on('hashChangeComplete', handleHashChange);

    return () => {
      router.events.off('hashChangeComplete', handleHashChange);
    };
  }, []);

  const onChangeTab = async (index: number, hash?: string) => {
    const { query } = router;
    const currentUrl = router.pathname;
    const as = hash ? `/class/${query.code}#${hash}` : `/class/${query.code}`;
    dispatch(changeTab(index));
    await router.push(currentUrl, as, { shallow: true });
  };

  return (
    <NavBar>
      <Tabs value={currentTab} aria-label='nav tabs'>
        <Tab label='Bảng tin' onClick={() => onChangeTab(0)} />
        <Tab label='Học viên' onClick={() => onChangeTab(1, 'students')} />
        <Tab label='Giảng viên' onClick={() => onChangeTab(2, 'teachers')} />
        <Tab label='Số điểm' onClick={() => onChangeTab(3, 'grades')} />
      </Tabs>
    </NavBar>
  );
};

export default NavTabs;
