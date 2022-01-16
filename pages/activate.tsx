import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import LinearProgress from '@mui/material/LinearProgress';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';

import Header from '../src/components/header';
import ActivateComponent from '../src/components/auth/activate';
import useRedirect from '../src/hooks/useRedirect';

const Activate: NextPage = () => {
  const [session, loading] = useSession();
  const redirect = useRedirect();
  const { isReady } = redirect;

  useEffect(() => {
    (async () => {
      if (!loading && session && isReady) {
        await redirect.doRedirect('/class');
      }
    })();
  }, [session, loading, isReady]);

  return loading ? (
    <LinearProgress color='secondary' />
  ) : (
    <React.Fragment>
      <Head>
        <title>Fit Class - Yêu cầu xác thực</title>
        <meta name='description' content='Request Activate' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Kích hoạt tài khoản' icon={<LockOpenRounded />} />
      <ActivateComponent />
    </React.Fragment>
  );
};

export default Activate;
