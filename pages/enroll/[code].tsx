import React, { useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import useRouter from 'next/router';
import { useSession } from 'next-auth/client';
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from 'react-toastify';

import { GetClassByCodeToEnroll } from '../../src/api/server';
import EnrollClass from '../../src/components/enrollClass';
import { IClass } from '../../src/type';

interface EnrollPageProps {
	classData: IClass;
}

const EnrollClassPage: NextPage<EnrollPageProps> = ({ classData }: EnrollPageProps) => {
	const [session, loading] = useSession();
	const router = useRouter;

	useEffect(() => {
		if (!classData) {
			toast.warning('Không tìm thấy lớp học! Bạn có thể nhập lại mã lớp', {
				autoClose: 1800,
				onClose: () => router.push('/enroll')
			});
		}
	}, []);

	const { token } = router.query;

	return loading || !classData ? (
		<LinearProgress color='secondary' />
	) : (
		<React.Fragment>
			<Head>
				<title>Fit Class - Tham gia lớp học</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<EnrollClass isAuth={!!session} classData={classData} token={(token as string) || ''} />
		</React.Fragment>
	);
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [],
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const code = params?.code;
	const data = await GetClassByCodeToEnroll(code as string);
	return {
		props: {
			classData: data
		},
		revalidate: 1
	};
};

export default EnrollClassPage;
