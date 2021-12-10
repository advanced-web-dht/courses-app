import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AppState } from '../../reducers';
import { changeTab } from './action';
import NavBar from './style';

const NavRoutes: Record<string, number> = {
  '#assignments': 1,
  '#students': 2,
  '#teachers': 3
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
      <Tabs value={currentTab} aria-label='nav tabs example'>
        <Tab label='Bảng tin' onClick={() => onChangeTab(0)} />
        <Tab label='Bài tập' onClick={() => onChangeTab(1, 'assignments')} />
        <Tab label='Học viên' onClick={() => onChangeTab(2, 'students')} />
        <Tab label='Giảng viên' onClick={() => onChangeTab(3, 'teachers')} />
      </Tabs>
    </NavBar>
  );
};

export default NavTabs;
