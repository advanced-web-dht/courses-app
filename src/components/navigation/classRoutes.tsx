import React from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons/faWindowRestore';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { SubListItemButton } from './style';

interface ClassRoutesProps {
	classCode?: string;
}

const ClassRoutes: React.FC<ClassRoutesProps> = ({ classCode }) => {
	return (
		<React.Fragment>
			<List>
				<ListItem>
					<ListItemIcon>
						<FontAwesomeIcon icon={faTasks} size='2x' />
					</ListItemIcon>
					<ListItemText primary='Quản lý lớp học' />
				</ListItem>
				<List>
					<Link href={`/class/${classCode}/grade`}>
						<a>
							<SubListItemButton>
								<ListItemIcon>
									<FontAwesomeIcon icon={faWindowRestore} size='lg' />
								</ListItemIcon>
								<ListItemText primary='Cấu trúc điểm' />
							</SubListItemButton>
						</a>
					</Link>
				</List>
			</List>
			<Divider />
		</React.Fragment>
	);
};

ClassRoutes.defaultProps = {
	classCode: ''
};

export default ClassRoutes;
