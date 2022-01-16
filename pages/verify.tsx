import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LinearProgress from '@mui/material/LinearProgress';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import { toast } from 'react-toastify';

import { VerifyAccount } from '../src/api/client/auth';
import Header from '../src/components/header';

const Verify: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { token } = router.query;
        if (token) {
          const result = await VerifyAccount(token as string);
          if (result) {
            toast.success('Kích hoạt tài khoản thành công!');
            router.push('/signin');
          } else {
            toast.warning('Token không hợp lệ hoặc đã hết hạn!');
            router.push('/signin');
          }
        } else {
          toast.error('Đường dẫn không hợp lệ!');
          router.push('/signin');
        }
      }
    })();
  }, [router.isReady]);

  return (
    <React.Fragment>
      <Head>
        <title>Fit Class - Kích hoạt tài khoản</title>
        <meta name='description' content='Verify account' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header title='Fit class' icon={<LockOpenRounded />} />
      <LinearProgress color='secondary' />
    </React.Fragment>
  );
};

export default Verify;
