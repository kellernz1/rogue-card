/** @type {import('tailwindcss').Config} */
   export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {
         colors: {
           spire: { bg: '#0d0d0f', red: '#ef4444', green: '#22c55e', blue: '#3b82f6', purple: '#7c3aed', amber: '#f59e0b' }
         }
       },
     },
     plugins: [],
   }

   