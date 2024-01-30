/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false,
	},
	// prefix: 'gcc-',
	content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				typo: "#363434",
				primary: "#62929a",
				secondary: "#efecec",
				tertiary: "#5c5757",
			},
		},
	},
	plugins: [],
};
