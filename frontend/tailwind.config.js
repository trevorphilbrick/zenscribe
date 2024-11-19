/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#040D12",
        customBackgroundTransparent: "#040d1247",
        customOnBackground: "#183d3d",
        customSelected: "#112c2c",
        customTextPrimary: "#FFFFFF",
        customTextSecondary: "#d3d2d2",
        customTextDisabled: "#7C7C7C",
        customPrimary: "#93B1A6",
        customPrimaryPressed: "#527366",
        customSecondary: "#5C8374",
        customTertiary: "#00adf5",
        customLightRed: "#FF6347",
      },
    },
  },
  plugins: [],
};
