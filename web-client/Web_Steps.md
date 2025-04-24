Steps in Creating the Web Client Interface.

1. Create the Project using react
   > npm create vite@ latest
   > Name it as Fitness-Workout-Log
   > Name packagename

# fitness-workout-log

> Choose React
> Choose Javascript
> Change directory to Fitness-Workout-Log
> npm install
> npm run dev

2. Install the needed dependencies for the frontend
   axios – Makes HTTP requests (e.g., fetch data from an API).
   react-icons – Adds icons from popular libraries as React components.
   react-router-dom – Handles page routing/navigation in React apps.
   react-toastify – Shows toast notifications (like success/error alerts).

# To install the above dependencies by this command

> npm install axios react-icons react-router-dom react-toastify

# Before installing tailwind css you must delete the code in the index.css

# To install tailwind css

tailwindcss – Utility-first CSS framework for fast and responsive UI styling.

# Follow this steps

> Go to https://tailwindcss.com/docs/installation/using-vite

# type this command in the integrated terminal

> npm install tailwindcss @tailwindcss/vite

# Add this in your vite.config.js

> import tailwindcss from '@tailwindcss/vite' // This in the import
> tailwindcss(), // this is inside the plugin

# Import this in your index.css file

> @import "tailwindcss";

# Verify if tailwind applies now
