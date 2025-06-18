/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // quét hết các file js/ts trong src
    "./public/index.html"           // nếu có file html gốc
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
