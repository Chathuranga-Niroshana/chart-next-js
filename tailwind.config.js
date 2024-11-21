/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'percentage-box-gradient': 'radial-gradient(70% 437.5% at 100% 50%, #86FFD2 0%, #049C64 47.89%)',
        'availability-box-gradient': 'radial-gradient(70% 437.5% at 100% 50%, #FF9FA1 0%, #FF0004 47.89%)',
        'quality-box-gradient': 'radial-gradient(70% 437.5% at 100% 50%, #F7E2E2 0%, #FFBB38 47.89%)',
        'meter-box-gradient': 'linear-gradient(270deg, rgba(255, 255, 255, 0.9) 0%, rgba(235, 235, 235, 0.9) 100%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
