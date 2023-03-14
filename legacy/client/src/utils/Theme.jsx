import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material';

const Theme = createTheme({
	palette: {
		primary: {
			main: '#1E1E1E',
		},
		secondary: {
			main: '#F9F9F9',
		},
	},

	typography: {
		fontFamily: 'Montserrat',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: '0.5rem',
					fontWeight: '600',
					fontSize: '0.875rem',
					lineHeight: '1.25rem',
					letterSpacing: '0.01em',
				},
				contained: {
					boxShadow: 'none',
					'&:hover': {
						boxShadow: 'none',
					},
				},
			},
		},
	},
});

export default Theme;
