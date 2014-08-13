# ExpressJS Multi-auth 

This project helps you avoid boilerplate code creating an expressjs web application which requires restricted access with a typical user login system.

Users access the application by classic - register > confirmation e-mail > login - workflow or by signing-in with Google, Facebook, Twitter.

## User storage

Choosing a user storage strategy is up to you. 
I included two examples, a mongodb based user model and an in-memory based one. 
You can easily implement a user model that suits your DB or any persistent storage.
Whichever strategy you decide to use, all you need is a global 'User' var in the app.js file:

```
var User = require('./app/models/user-test'); // in-memory storage
```
Take a look to /app/models/user-test.js to know which methods your own user model needs to be integrated.

## Account federation
When it's possible, accounts are "federated" using the e-mail. That means that if you create an account manually, by entering "myemail@email.xx" as e-mail address, and then you sign-in using a facebook account having the same e-mail, you will access the original account, not creating a new one. 

## Authentication providers

I used the excellent [PassportJS](http://passportjs.org) middleware to manage OAuth providers authentication.
This test project provide Google, Facebook and Twitter sign-in options.
Before using them, however, you have to create an "app" on each system you'd like to use. 

You can manage your apps, respectively, on:
* [Facebook developers portal](https://developers.facebook.com/)
* [Google API Console](https://console.developers.google.com)
* [Twitter developers](https://dev.twitter.com)

Once you have an application configured for each provider, you can edit /app/config/auth.js adding your secure credentials and your website URL instead of localhost:3000. If you need it you can also change return URLs (routes are in /routes/auth.js).

## Try it!

You're ready to launch the app with 
```
node app.js 
```
from the root of the project. 
Then visit http://localhost:3000 and play around.
