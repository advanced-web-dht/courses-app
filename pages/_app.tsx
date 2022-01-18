import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'next-auth/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CacheProvider, EmotionCache } from '@emotion/react';

import { wrapper } from '../src/reducers';
import { Page } from '../src/type/page';
import theme from '../src/theme';
import CommonProvider from '../src/store/common';
import 'react-toastify/dist/ReactToastify.css';
import createEmotionCache from '../src/cache';

type AppPropsWithLayoutProps = AppProps & {
  Component: Page;
  emotionCache: EmotionCache;
};

library.add(fab);

const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithLayoutProps): JSX.Element => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Fit Class</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CommonProvider>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </CommonProvider>
        </ThemeProvider>
      </CacheProvider>
      <ToastContainer position='bottom-right' autoClose={1500} newestOnTop={false} draggable={false} closeOnClick pauseOnHover />
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
