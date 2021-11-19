import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'next-auth/client';

import theme from '../src/theme';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<Provider session={pageProps.session}>
			<Head>
				<title>My page</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
			<ToastContainer
				position='bottom-right'
				autoClose={4000}
				newestOnTop={false}
				draggable={false}
				closeOnClick
				pauseOnHover
			/>
		</Provider>
	);
}
