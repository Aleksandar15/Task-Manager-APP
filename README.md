# Task App by Aleksandar15

## Overview

This is a simple to-do list app. Create a user account and start writing notes of what you have to get done and set them as completed once done.

See the project in action [here](https://task-manager-aleksandar15.herokuapp.com/).

## Features

- Create a user account
- Sending automated email using the [SendGrid API](https://sendgrid.com/docs/API_Reference/index.html)
- Create, edit and delete tasks
- Filter your tasks by completion
- Sort tasks by date
- Decide how many tasks you want to see
- Update your account information

## Run the project

- Clone this project
- cd into the project directory
- Run `npm install` in your command line
- Create a `dev.env` file inside a `config` folder in the root of the project with the URL to your MongoDB as `MONGODB_URL`, your port as `PORT`, your SendGrid credentials as `SENDGRID_API_KEY` and your JSON Web Token (JWT) as `JWT_SECRET`.
- Run `npm start` in your command line
- Visit http://localhost:3000 in your browser

## Tech stack
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- EJS
- Little bit of jQuery for the frontend