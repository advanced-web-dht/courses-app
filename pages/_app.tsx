import React, { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import theme from '../src/theme';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>My page</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box>
					<Component {...pageProps} />
				</Box>
			</ThemeProvider>
		</React.Fragment>
	);
}
