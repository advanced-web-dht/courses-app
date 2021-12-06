import React from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import ClassIcon from '@mui/icons-material/Class';

import { wrapper } from '../../src/reducers';
import { Page } from '../../src/type/page';
import { ClassesActions } from '../../src/reducers/classes';
import Classes from '../../src/components/classes';
import { GetAllClasses } from '../../src/api/server';
import ClassLayout from '../../src/components/layout/class';

import { IClass } from '../../src/type';

const Home: Page = () => {
	return (
		<React.Fragment>
			<Head>
				<title>Fit Class - Lớp học</title>
				<meta name='description' content='Danh sách lớp học' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Classes />
		</React.Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	const session = await getSession(context);
	if (session) {
		const classes: IClass[] = await GetAllClasses(session?.accessToken as string);
		store.dispatch(ClassesActions.storeClass(classes));

		return {
			props: {}
		};
	}

	return {
		redirect: {
			destination: '/signin',
			statusCode: 302
		}
	};
});

Home.getLayout = (page: React.ReactElement) => {
	return (
		<ClassLayout icon={<ClassIcon />} title='Fit Class'>
			{page}
		</ClassLayout>
	);
};
export default Home;
