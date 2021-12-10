import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import LinearProgress from '@mui/material/LinearProgress';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';

import Header from '../../src/components/header';
import SignInForm from '../../src/components/auth/signInForm';
import useRedirect from '../../src/hooks/useRedirect';

const SignIn: NextPage = () => {
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
        <title>Fit Class - Đăng Nhập</title>
        <meta name='description' content='Đăng nhập vào Fit class' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Fit class' icon={<LockOpenRounded />} />
      <SignInForm />
    </React.Fragment>
  );
};

export default SignIn;
