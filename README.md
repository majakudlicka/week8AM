# week_8am-jokes

# Founders and Coders, LMAO Jokes

Live site: [Herokuapp.com/](https://am-jokes.herokuapp.com/)

Scroll to the bottom of the README for installation instructions, if you would like to run our project locally!

### User Story 

**As a** member of Founders and Coders, who wants to learn from my fellow devs
> **I want to** log in with my Github account  
> **So that** I can use my Github organisation's info to see posts from my fellow students.

### Requirements
+ [x] I can click on a button, which allows me to log in via my Github account
+ [x] The look of the button should make it obvious that it is this form of login
+ [x] Once I'm logged in, I should see a list of blog posts
+ [x] I can see my username & profile picture on each page that I visit

## Schema diagrams

Here are the schema diagrams for the database:

### Jokes: 1 to 1
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
body | character varying (600) | not null
author_id | interger | not null

### Authors: 1 to Many

Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
username | character varying(100) | not null
password | character varying(100) | not null

# Learnings

### Asynchronous reply.redirect
We got around this through replying with a view which had a button that redirected to the jokes. A different appraoch would be to use 'lax'.
P.s. double redirect does not work!

### JSON Web Tokens
You can decode the the payload within the jwt: const decoded = jwt.decode(req.state.token).
The content is not encrypted!

# Installation instructions

 - Clone this repo and cd into it

  - `git clone https://github.com/majakudlicka/week8AM`

 - Run `npm install` to install all dependencies

#### Database (To run the database locally)

 - Probably best you come speak to us
 - Create a `config.env` file in the root of the project

 - Add the `DATABASE_URL`
 - Add the `CLIENT_ID`
 - Add the `CLIENT_SECRET`
 - Add the `JWT_SECRET`

#### Run locally

 - Run `npm run ds` to start the server using Nodemon (which will automatically restart Node when changes are detected in your files). 

 - Navigate to http://localhost:3000/ in your browser

#### Tests

 - Run `npm run test` to run the tests 
