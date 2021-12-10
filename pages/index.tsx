import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import LinearProgress from '@mui/material/LinearProgress';

const Index: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (session) {
        router.replace('/class');
      } else {
        router.replace('/signin');
      }
    }
  }, [loading, session]);

  return loading ? (
    <LinearProgress color='secondary' />
  ) : (
    <React.Fragment>
      <Head>
        <title>Fit Class</title>
        <meta name='description' content='Fit class redirect page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </React.Fragment>
  );
};

export default Index;
