# ClosetCollections <a href="https://closet-collections-308301.uc.r.appspot.com/"><img src="https://i.ibb.co/g7h4wbp/Closet-Collection-Logo.png" width=35 height=35></img><a>
Fashion application with the latest clothing and apparel releases.

# Description
Closet Collections is designed to allow the user to curate a collection of clothing items and create/save outfits based on those items.

Upon entry to the site, the User is presented with the publics 'Top Rated' and 'Worst Rated' outfit based public opinion, and an outfit based on the weather. Additionally the user may choose to display a live stream chat to engage in conversations regarding upcoming clothing items they are looking forward to.

After the initially entry of the page, the user has the option  to view either their closet, a public chat feed, or a calendar for upcoming releases.

The closet feature stores both a users' individual clothes and a collection of created outfits. Users can drag and drop clothes to the whiteboard and the outfit will be saved.

The calendar feature displays to the user new and upcoming releases based on current trends and highly sought after items. The calendar also has a feature that allows the user to save a certain release item and be notified shortly before the item becomes available.

# Application Design/Mock-up
<img src="https://i.ibb.co/PGyQ3MF/thesis-mockups-mvps.jpg" width=70 height=45></img>

# Dependencies
```
"dependencies": {
    "@bumaga/tabs": "^0.2.0",
    "@craftjs/core": "0.1.0-beta.16",
    "@material-ui/core": "^4.11.3",
    "@material-ui/icons": "^4.11.2",
    "axios": "^0.21.1",
    "cloudinary": "^1.24.0",
    "cloudinary-react": "^1.6.8",
    "cookie-parser": "^1.4.5",
    "copy-to-clipboard": "^3.3.1",
    "cors": "^2.8.5",
    "css-loader": "^5.1.1",
    "dotenv": "^8.2.0",
    "eslint-config-airbnb": "^18.2.1",
    "expo-cli": "^4.2.1",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "hamburger-react": "^2.4.0",
    "jquery": "^3.6.0",
    "konva": "^7.2.4",
    "lzutf8": "^0.6.0",
    "material-ui-color-picker": "^3.5.1",
    "mysql2": "^2.2.5",
    "passport": "^0.4.1",
    "passport-google-oauth": "^2.0.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-oauth": "^1.0.0",
    "react": "^17.0.1",
    "react-burger-menu": "^2.7.1",
    "react-cloudinary-upload-widget": "^1.4.3",
    "react-contenteditable": "^3.3.5",
    "react-dom": "^17.0.1",
    "react-google-button": "^0.7.2",
    "react-hook-form": "^6.15.4",
    "react-icons": "^4.2.0",
    "react-medium-image-zoom": "^4.3.1",
    "react-konva": "^17.0.1-3",
    "react-native": "^0.63.4",
    "react-native-super-grid": "^4.1.1",
    "react-native-web": "^0.15.0",
    "react-router-dom": "^5.2.0",
    "reflect-metadata": "^0.1.13",
    "sequelize": "^6.5.0",
    "sequelize-typescript": "^2.1.0",
    "style-loader": "^2.0.0",
    "styled-components": "^5.2.1",
    "use-image": "^1.0.7"
  },
  "devDependencies": {
    "@babel/cli": "^7.13.0",
    "@babel/core": "^7.13.1",
    "@babel/preset-env": "^7.13.5",
    "@babel/preset-react": "^7.12.13",
    "@types/cookie-parser": "^1.4.2",
    "@types/cors": "^2.8.10",
    "@types/express": "^4.17.11",
    "@types/express-session": "^1.17.3",
    "@types/jest": "^26.0.20",
    "@types/jquery": "^3.5.5",
    "@types/node": "^14.14.31",
    "@types/passport": "^1.0.6",
    "@types/passport-google-oauth20": "^2.0.6",
    "@types/react": "^17.0.2",
    "@types/react-dom": "^17.0.1",
    "@types/react-native": "^0.63.50",
    "@types/react-router-dom": "^5.1.7",
    "@types/react-test-renderer": "^17.0.1",
    "@types/sequelize": "^4.28.9",
    "@types/validator": "^13.1.3",
    "@typescript-eslint/eslint-plugin": "^4.16.1",
    "@typescript-eslint/parser": "^4.16.1",
    "babel-plugin-module-resolver": "^4.1.0",
    "eslint": "^7.21.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.22.0",
    "eslint-plugin-react-hooks": "^1.7.0",
    "html-webpack-plugin": "^5.2.0",
    "husky": "^4.3.8",
    "lint-staged": "^10.5.4",
    "nodemon": "^2.0.7",
    "prettier": "^2.2.1",
    "socket-io": "^1.0.0",
    "ts-loader": "^8.0.17",
    "ts-node": "^9.1.1",
    "tslint": "^6.1.3",
    "typescript": "^4.2.2",
    "typescript-loader": "^1.1.3",
    "webpack": "^5.24.2",
    "webpack-cli": "^4.5.0",
    "webpack-dev-server": "^3.11.2"
  }
  ```
  # Installation and Startup
  1. Fork the Most-Valuable-Programmers/closet-collections repo

  2. Clone your forked repo to your local system

  3. Run npm install to install dependencies
```bash
  npm install
```
  4. Create a **.env** file in your main directory and install the dotenv package

```bash
  npm install dotenv
```
The **.env** file will house all of your keys and other sensitive information

Variable | Description
--------------|--------------
CLIENT_ID | key from google Oauth
CLIENT_SECRET | secret generated from google Oauth
TWILIO_ACCOUNT_SID|
TWILIO_AUTH_TOKEN |

  5. Run npm start to start server

  6. Run npm run dev to run webpack build

Closet Collections utilizes Sequelize and the use of Clever-Cloud  for storage needs.

# Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.
# APIs
Google Auth
Yelp Fusion API

# Database
Setup Clever Cloud account to gain access to database. https://www.clever-cloud.com/en/ Clever Cloud env keys can be found here. Select MySQL for database used.
If Sequelize is installed, start the server: sequelize.sync If Sequelize is not installed, check out the Sequelize documentation for instructions on how to proceed. https://sequelize.org/master/manual/getting-started.html
Mongoose database was also used. Documentation can be found here for instructions on how to install and quick start https://mongoosejs.com/docs/guides.html.

# Schema
Sequelize Schema: https://dbdiagram.io/d/60205c5180d742080a398af4
Mongoose Schema: https://dbdiagram.io/d/6057bd1aecb54e10c33c852d

# Deployment
Google cloud was used to deploy the application. Documentation can be found here to successfully deploy https://cloud.google.com/deployment-manager/docs/quickstart. Make sure to include an app.yaml file with the following:

``` yaml
runtime: nodejs
env: flex
resources:
  memory_gb: 5.70
```
