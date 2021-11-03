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
	}
});

export default theme;
