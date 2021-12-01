import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CollapseIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandedIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons/faChalkboardTeacher';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

import { CommonContext } from '../../store/common';
import { ClassContext } from '../../store/class';
import SubListClass from './subListClass';
import ClassRoutes from './classRoutes';
import useWindowWidth from '../../hooks/useWindowWidth';
import { StyledDrawer, DrawerHeader, HomePage } from './style';
import { ROLES } from '../../constants';

interface NavigationProps {
	classDetail?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ classDetail }) => {
	const { isNavOpen, openNav, closeNav } = useContext(CommonContext);
	const { classes, currentClass } = useContext(ClassContext);

	const [expanded, setExpanded] = useState(false);
	const [isOpenTeachClass, setIsOpenTeachClass] = useState(false);
	const [isOpenStudyClass, setIsOpenStudyClass] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const windowWidth = useWindowWidth();

	useEffect(() => {
		if (windowWidth < 650) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [windowWidth]);

	const handleCloseDrawer = () => {
		if (!expanded) {
			closeNav();
			setIsOpenTeachClass(false);
			setIsOpenStudyClass(false);
		}
	};

	return (
		<React.Fragment>
			<StyledDrawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={isNavOpen}
				onMouseEnter={openNav}
				onMouseLeave={handleCloseDrawer}
				onClose={handleCloseDrawer}
				$expanded={expanded}
			>
				<DrawerHeader>
					<Link href='/class' passHref>
						<HomePage>
							<FontAwesomeIcon icon={faHome} size='2x' />
						</HomePage>
					</Link>
					{isMobile ? (
						<IconButton size='large' onClick={handleCloseDrawer}>
							<CloseIcon />
						</IconButton>
					) : (
						<IconButton size='large' onClick={() => setExpanded(!expanded)}>
							{expanded ? <CollapseIcon /> : <ExpandedIcon />}
						</IconButton>
					)}
				</DrawerHeader>
				<Divider />
				{classDetail && (currentClass.role === ROLES.owner || currentClass.role === ROLES.teacher) && (
					<ClassRoutes />
				)}
				<List>
					<ListItemButton onClick={() => setIsOpenTeachClass(!isOpenTeachClass)}>
						<ListItemIcon>
							<FontAwesomeIcon icon={faChalkboardTeacher} size='2x' />
						</ListItemIcon>
						<ListItemText primary='Giảng dạy' />
						{isOpenTeachClass ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<SubListClass isOpen={isOpenTeachClass} list={classes} type='teacher' />
				</List>
				<Divider />
				<List>
					<ListItemButton onClick={() => setIsOpenStudyClass(!isOpenStudyClass)}>
						<ListItemIcon>
							<FontAwesomeIcon icon={faGraduationCap} size='2x' />
						</ListItemIcon>
						<ListItemText primary='Đã đăng ký' />
						{isOpenStudyClass ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<SubListClass isOpen={isOpenStudyClass} list={classes} type='student' />
				</List>
			</StyledDrawer>
		</React.Fragment>
	);
};

Navigation.defaultProps = {
	classDetail: false
};

export default Navigation;
