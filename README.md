# Task App by Aleksandar15

## Overview

A task-manager APP with user Authentication. Users can create an account and start writing notes of things a user has to do.
- They can mark the notes as completed.
Using EJS (Embedded JavaScript) with Node.js which is a templating language that allowed me to generate HTML markup with plain JavaScript, I created templates that contain placeholders for rendering dynamic content -> Hence why my Task-manager app, deployed on Render.com, runs server-side and EJS renders the frontend (client-side).
- For the MongoDB the database is hosted on MongoDB Atlas and I'm using the "MONGODB_URL" from my environment to connect to it -> which is a great alternative to hosting a "containerized instance" of MongoDB on Render.com. (<a href="https://render.com/docs/connect-to-mongodb-atlas">more info on Render</a>)
- SendGrid API is used for sending 'welcome email' to users that create new accounts.
- Extra features:
The "/me" route of "Account" section allows the user to "*change password*" or "*delete account*".


### See my live app in action [here](https://task-manager-app-alek.onrender.com).

#### Test login user:

- e-mail: `test@test.com`
- password: `testtest`

## Features

- Create a user account.
- Sending automated email using the [SendGrid API](https://sendgrid.com/docs/API_Reference/index.html).
- Create, edit and delete tasks.
- Filter your tasks by completion.
- Sort tasks by date.
- Decide how many tasks you want to see.
- Update your account information.
- Delete your account.

## Run my project

- Clone this project.
- Navigate (cd) into your project directory.
- Run `npm install` in your command line.
- Create a `config` folder in the root of the project and inside of that folder create a `dev.env` file and write the URL for your MongoDB as `MONGODB_URL`, your port as `PORT`, your SendGrid credentials as `SENDGRID_API_KEY` and your JSON Web Token (JWT) as `JWT_SECRET`.
- Run `npm start` in your command line.
- Visit http://localhost:3000 in your browser!

## Tech stack

- Node.js
- Express.js
- MongoDB
- JWT (Json Web Token) for authentication
- EJS
- Little bit of jQuery for the frontend
- SendGrid API for mails

<h2 align='center'>Contact Info</h2>
<br/>
<p align='center'>
    <a href="https://instagram.com/aleksandarr15"><img src="https://img.shields.io/badge/instagram.com-@aleksandarr15-red?style=flat&logo=instagram"></a>&nbsp;
    <a href="mailto:aleksandarangelov15@hotmail.com"><img src="https://img.shields.io/badge/email-aleksandarangelov15@hotmail.com-black?style=flat&logo=gmail"></a>&nbsp;
    <a href="https://aleksandar15.github.io/portfolio"><img src="https://img.shields.io/badge/portfolio-aleksandar15.github.io-green?style=flat"></a>&nbsp;
    <a href="https://www.linkedin.com/in/aleksandar15"><img src="https://img.shields.io/badge/linkedin-aleksandar15.github.io-blue?style=flat&logo=linkedin"></a>&nbsp;
</p>
