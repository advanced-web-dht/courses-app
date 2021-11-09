import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/router';
import Link from 'next/link';

import NavBar from './style';

export default function NavTabs() {
	const router = useRouter();
	const value = router.pathname.includes('teachers') ? 1 : 0;
	const classId = router.query.id;

	return (
		<NavBar sx={{ width: '100%' }}>
			<Tabs value={value} aria-label='nav tabs example'>
				<Link href={`/class/${classId}/students`} passHref>
					<Tab label='Students' />
				</Link>
				<Link href={`/class/${classId}/teachers`} passHref>
					<Tab label='Teachers' />
				</Link>
			</Tabs>
		</NavBar>
	);
}
