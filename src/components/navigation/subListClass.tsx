import React, { useMemo } from 'react';
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
			list.filter((cls) => {
				if (cls.members[0].detail?.role === type) {
					return true;
				}
				if (type === 'teacher') {
					return cls.members[0].detail?.role === 'owner';
				}
				return false;
			}),
		[list]
	);

	return (
		<Collapse in={isOpen} timeout='auto' unmountOnExit>
			<List component='div' disablePadding>
				{renderList.map((cls) => (
					<SubListItemButton key={cls.id}>
						<StandName>{cls.name.charAt(0).toUpperCase()}</StandName>
						<ListItemText primary={cls.name} />
					</SubListItemButton>
				))}
			</List>
		</Collapse>
	);
};
export default SubListClass;
