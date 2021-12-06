import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'next-auth/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { wrapper } from '../src/reducers';
import { Page } from '../src/type/page';
import theme from '../src/theme';
import CommonProvider from '../src/store/common';
import 'react-toastify/dist/ReactToastify.css';

type AppPropsWithLayoutProps = AppProps & {
	Component: Page;
};

library.add(fab);

const MyApp = ({ Component, pageProps }: AppPropsWithLayoutProps): JSX.Element => {
	const getLayout = Component.getLayout ?? ((page) => page);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<Provider session={pageProps.session}>
			<Head>
				<title>Fit Class</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				<CommonProvider>
					<CssBaseline />
					{loaded && getLayout(<Component {...pageProps} />)}
				</CommonProvider>
			</ThemeProvider>
			<ToastContainer
				position='bottom-right'
				autoClose={1500}
				newestOnTop={false}
				draggable={false}
				closeOnClick
				pauseOnHover
			/>
		</Provider>
	);
};

export default wrapper.withRedux(MyApp);
