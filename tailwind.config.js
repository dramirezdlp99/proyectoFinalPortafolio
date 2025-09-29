/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#060E28",
        neutralCustom: "#E2E2E2",
        panel: "#f6f6f6"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        comic: ["'Comic Neue'", "Bangers", "cursive"]
      }
    }
  },
  plugins: []
}
