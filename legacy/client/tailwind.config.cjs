/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#f37172',
			},
		},
		fontFamily: {
			Montserrat: ['Montserrat', 'sans-serif'],
			BalooBhai: ['BalooBhai', 'cursive'],
		},
	},
	plugins: [],
};
