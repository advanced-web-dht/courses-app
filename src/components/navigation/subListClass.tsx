import React, { useMemo } from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { IClass } from '../../type';
import { StandName, SubListItemButton } from './style';

interface SubListClassProps {
  isOpen: boolean;
  list: IClass[];
  type: 'teacher' | 'student';
}

const SubListClass: React.FC<SubListClassProps> = ({ isOpen, list, type }) => {
  const renderList = useMemo(
    () =>
      list?.filter((cls) => {
        if (cls.role === type) {
          return true;
        }
        if (type === 'teacher') {
          return cls.role === 'owner';
        }
        return false;
      }),
    [list?.length]
  );

  return (
    <Collapse in={isOpen} timeout='auto' unmountOnExit>
      <List disablePadding>
        {renderList?.map((cls) => (
          <Link key={cls.id} href={`/class/${cls.code}`} passHref prefetch={false}>
            <SubListItemButton>
              <StandName>{cls.name.charAt(0).toUpperCase()}</StandName>
              <ListItemText primary={cls.name} />
            </SubListItemButton>
          </Link>
        ))}
      </List>
    </Collapse>
  );
};
export default SubListClass;
