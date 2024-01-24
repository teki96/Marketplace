/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
      mytheme: {
          "primary": "#f3f4f6",
          
          "secondary": "#dc2626",
          
          "accent": "#1FB2A6",
          
          "neutral": "#191D24",
          
          "base-100": "#e5e7eb",

          "info": "#3ABFF8",

          "success": "#84cc16",

          "warning": "#dc2626",

          "error": "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

