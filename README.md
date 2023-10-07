# meteo
meteoapp
Sources et references utilisées:

https://home.openweathermap.org/

documentation Ionic

:memo::memo:
INSTALLER LES DEPENDENCES :

npm install 

npm run dev 

ionic build 

RUN : 
ionic Build 

Install Capacitor​


npm i @capacitor/core
npm i -D @capacitor/cli
Initialize your Capacitor config​
Then, initialize Capacitor using the CLI questionnaire:

npx cap init

The CLI will ask you a few questions, starting with your app name, and the package ID you would like to use for your app.

Create your Android and iOS projects​
After the Capacitor core runtime is installed, you can install the Android and iOS platforms.

npm i @capacitor/android @capacitor/ios
Once the platforms have been added to your package.json, you can run the following commands to create your Android and iOS projects for your native application.

npx cap add android
npx cap add ios
Sync your web code to your native project​
Once you've created your native projects, you can sync your web application to your native project by running the following command.

npx cap sync
