import React, { memo, useContext, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Button from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { getSession } from 'next-auth/client';

import ClassIcon from '@mui/icons-material/Class';
import PlusIcon from '@mui/icons-material/Add';

import Navigation from '../../src/components/navigation';
import Classes from '../../src/components/classes';
import Header from '../../src/components/header';
import AddClassModal from '../../src/components/addClassModal';
import useToggle from '../../src/hooks/useToggle';
import { ClassContext } from '../../src/store/class';
import { GetAllClasses } from '../../src/api/server';

import { IClass } from '../../src/type';

interface ClassesPageProps {
	classes: IClass[];
}

const addClassModalWithButton = () => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	return (
		<React.Fragment>
			<Tooltip title='Thêm lớp học'>
				<Button onClick={handleOpen} aria-label='Add Class'>
					<PlusIcon />
				</Button>
			</Tooltip>
			<AddClassModal open={isOpen} handleClose={handleClose} />
		</React.Fragment>
	);
};

const AddClassModalWithButton = memo(addClassModalWithButton);

const Home: NextPage<ClassesPageProps> = ({ classes }: ClassesPageProps) => {
	const { StoreClasses } = useContext(ClassContext);

	useEffect(() => {
		StoreClasses(classes);
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Fit Class - Lớp học</title>
				<meta name='description' content='Danh sách lớp học' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Box sx={{ display: 'flex' }}>
				<Navigation />
				<Box width='100%'>
					<Header title='Fit Class' icon={<ClassIcon />} rightAction={<AddClassModalWithButton />} isAuth />
					<Classes />
				</Box>
			</Box>
		</React.Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	if (session) {
		const classes: IClass[] = await GetAllClasses(session?.accessToken as string);

		return {
			props: {
				classes
			}
		};
	}

	return {
		redirect: {
			destination: '/signin',
			statusCode: 302
		}
	};
};

export default Home;
