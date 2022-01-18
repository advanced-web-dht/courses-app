import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import LinearProgress from '@mui/material/LinearProgress';

import Header from '../src/components/header';
import ResetPassword from '../src/components/auth/resetPassword';
import useRedirect from '../src/hooks/useRedirect';

const ForgotPassword: NextPage = () => {
  const [session, loading] = useSession();
  const redirect = useRedirect();
  const { isReady } = redirect;

  /* Handle for google sign in and already sign in */
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
        <title>Fit Class - Reset mật khẩu</title>
        <meta name='description' content='Lấy lại mật khẩu' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Reset mật khẩu' icon={<LockOpenRounded />} />
      <ResetPassword />
    </React.Fragment>
  );
};

export default ForgotPassword;
