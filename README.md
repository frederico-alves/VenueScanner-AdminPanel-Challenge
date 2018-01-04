# Venuescanner AdminPanel
[CLICK HERE to View the Project Published](https://venuescanner-adminpanel.herokuapp.com/) <br>
Admin panel to manage the users of a platform, made with Node.JS and MongoDB
<br>
![demo_01_sm](https://user-images.githubusercontent.com/31135848/34550462-0685e992-f109-11e7-8871-2a99fb861952.png)
<br>

## Install
Option A - Explore the web app online
1. Open `https://venuescanner-adminpanel.herokuapp.com`
2. Login credentials `username: admin`, `password: admin`.
3. Explore the web app (`GoogleChrome` or `MozillaFirefox`).
---
Option B - Setup in a local machine
1. Clone repository running `git clone https://github.com/fredericoAlvesJS/phonebook.git`<br>
2. Run `cd venuescanner-adminpanel`
2. Run `npm install`. It will install Node dependencies automatically.
3. Run `node app.js` for a dev server.
4. Navigate to `http://localhost:3000/`.
5. To generate the database: Run `mongod` from MongoDB 3.4.
6. Login credentials `username: admin`, `password: admin`.
5. Analyze the code with your favourite code editor.

## FRONTED DEV
Wirefram in `Adobe Illustrator CC`. Mockup in `Adobe Photoshop CC`
![screenshot_06](https://user-images.githubusercontent.com/31135848/34549134-44e5c1fe-f0fe-11e7-9b06-b3173477cf81.png)

Markup with `HTML@5.0`+`EJS@2.5.7`. Styled and animated with `CSS@3.0`
![screenshot_09](https://user-images.githubusercontent.com/31135848/34549751-0151b240-f103-11e7-9dce-1cbd73da081a.png)

## BACKEND DEV

User model with the fields: `login`, `password` for Administrators to login in the app.
Clients model with the fields: `firstName`, `surname`, `email`, `password`.
![screenshot_08](https://user-images.githubusercontent.com/31135848/34549941-a5f9d7ea-f104-11e7-96dc-5a4977ae5cf0.png)

## Passwords stored safely in the Database
The password of the administrators are stored safely in the database with `salt` and `hash` instead of saving the regular string <br>
![screenshot_10](https://user-images.githubusercontent.com/31135848/34549964-d184cd66-f104-11e7-91f9-965551fbe9bb.png)

## Authentication
The user must be logged as administrator to have the access to the other routes.
![screenshot_01](https://user-images.githubusercontent.com/31135848/34548408-e0ea3e0e-f0f9-11e7-95e9-a3e1ca0e3342.png)<br>
![screenshot_02](https://user-images.githubusercontent.com/31135848/34548545-8d27e996-f0fa-11e7-82e5-c4b217842465.png)
<br>

It's secure! Test the boundaries!<br>
![screenshot_03](https://user-images.githubusercontent.com/31135848/34548588-d13c9032-f0fa-11e7-9c10-05a0aca470e6.png)
<br>

The `adminMustBeLoggedIn` middleware protects the views of the app from unwanted users with Passport.JS. 
![screenshot_07](https://user-images.githubusercontent.com/31135848/34549352-f6af3b4e-f0ff-11e7-8c61-4e995bbfff64.png)

## RESTful Routes
![screenshot_11](https://user-images.githubusercontent.com/31135848/34550159-70c47f7e-f106-11e7-9c29-5c8687135bc8.png)



## Further Information
To get more information on the Admin Panel please feel free to message me or email to fredericoalvesJS@gmail.com or contact@fredericoalves.uk
