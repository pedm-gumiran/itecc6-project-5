Add the steps here please on how is the process in creating the project starting from the installation down to the devlopment phase
Note: Add also the needed packages to installed.
Thanks!!!!!!😁

Steps in creating the mobile-version of the app
Start here......

installation terminal
npx create-expo-app@latest ./

//TO REMEMBER!
command 
stop the server 
Ctrl + C
restart server 
R

go to the app.json search for schemes then rename example   "scheme": "movies",
1. Download in the APP store EXPO GO , open the app and go to TERMINAL
npx expo start

2. removing the default files
npm run reset-project

3. Styling (THIS IS REQUIRED)
step 1:
npm install nativewind tailwindcss@^3.4.17 react-native-reanimated@3.16.2 react-native-safe-area-context

 # step 2: 
npx tailwindcss init
(this will generate your configuration file tailwind.config.js)

# step 3:
npx expo customize metro.config.js
(this will generate your configuration file metro.config.js)

# step 4: create this --> nativewind-env.d.ts Under your project and copy this
 /// <reference types="nativewind/types" />

# step 5: re start the sever 
Ctrl + C and run npx expo --clear

