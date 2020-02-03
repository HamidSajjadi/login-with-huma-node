<p style="font-weight: 800; font-size: 26px;">Login With Huma For NodeJS</p>


This package implements server side requests for login with Huma process.

## Installing

npm:
 `$ npm install login-with-huma-node`

yarn:
 `$ yarn add login-with-huma-node`

## Usage Sample
You need to create an object and give it your app credentials either explicitly in the constructor, or through environment variables by setting `HUMA_CLIENT_SECRET` and `HUMA_CLIENT_ID`.

```javascript
const HumaLogin = require("login-with-huma-node").default;
let huma = new HumaLogin({
            clientSecret: '', // your app client secret must be given either here or through environemnt variables
            clientId: '',  // your app client id must be given either here or through environemnt variables
            accessToken: '', // if you have gotten tokens for user before (optional)
            refreshToken: '', // if you have gotten tokens for user before (optional)
        });
		
		// exchanging your one-time-use token for userInfo
huma.exchangeTemporaryCode(code).then(result => {
	let userData = result.user; // holds user data (result.user.phone)
	// or simply
	let userData = huma.userInfo;
}).catch(handleError(e));
		
/**
get user data with AccessToken
you need to give accessToken as an input to this function 
if you have not used exchangeTemporaryCode on this instance, 
or did not give the token in constructor call
*/
huma.getUserData().then(result => { 
	let userData = result // holds user data (result.phone)
	// or simply
	let userData = huma.userInfo;
});
```
