import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
	palette: {
		primary: {
			main: '#0073e6',
			dark: '#0258c7'
		}
	},
	typography: {
		fontFamily: [
			'Be Vietnam Pro',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					padding: 0,
					margin: 0,
					fontFamily:
						'Be Vietnam Pro, Roboto, Fira Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, sans-serif',
					backgroundColor: '#f4f6f6',
					color: '#3e4b4b',
					fontSize: '14px'
				},
				a: {
					color: 'inherit',
					textDecoration: 'none'
				},
				ol: {
					paddingLeft: 0
				},
				li: {
					listStyle: 'none'
				},
				'*': {
					boxSizing: 'border-box'
				}
			}
		}
	}
});

export default theme;
