import React from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import FontAwesomeSvgIcon from '../UI/fontAweosomeIcon';
import { SubListItemButton, ClassRoutesList } from './style';

interface ClassRoutesProps {
  classCode?: string;
}

const ClassRoutes: React.FC<ClassRoutesProps> = ({ classCode }) => {
  return (
    <React.Fragment>
      <ClassRoutesList>
        <ListItem>
          <ListItemIcon>
            <FontAwesomeSvgIcon icon={faTasks} size='large' />
          </ListItemIcon>
          <ListItemText primary='Quản lý lớp học' />
        </ListItem>
        <List component='div'>
          <Link href={`/class/${classCode}/grade`}>
            <a>
              <SubListItemButton>
                <ListItemIcon>
                  <FontAwesomeSvgIcon icon={faWindowRestore} />
                </ListItemIcon>
                <ListItemText primary='Cấu trúc điểm' />
              </SubListItemButton>
            </a>
          </Link>
        </List>
      </ClassRoutesList>
      <Divider />
    </React.Fragment>
  );
};

ClassRoutes.defaultProps = {
  classCode: ''
};

export default ClassRoutes;
