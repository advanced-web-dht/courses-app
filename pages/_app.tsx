import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'next-auth/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import theme from '../src/theme';
import CommonProvider from '../src/store/common';
import ClassProvider from '../src/store/class';
import 'react-toastify/dist/ReactToastify.css';

library.add(fab);

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
					<ClassProvider>
						<CssBaseline />
						{loaded && <Component {...pageProps} />}
					</ClassProvider>
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
}
