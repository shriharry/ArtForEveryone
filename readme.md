# Overview
It's multi user drawing application (Art for everyone). User can create account and login into application. After login, User can see all publicly available drawings drawn by other users. Logged in user can also create drawing on canvas using given brush of different size and colors; they can also erase and save their drawing. User can save drawings as Public or they can also save it as Private mode. Privately created drawings will not be visible to other users in drawing list but current user can see his public/privates drawings and other users public drawing. User can also delete drawings which belongs to him/her only.


# Architecture

- This is repo serves serves both front-end and backend.
- Front End is designed and developed using React, @reduxjs/toolkit and saga.
- Back End is designed and developed with NodeJS(express framework) with postgresql as database and Sequelize as ORM.
- Below is top level view of both FrontEnd and BackEnd folder structures

  ### FrontEnd (Client)
  - components - (Functional react components. Eg. SignUp, SignIn, Drawing and List)
  - stores  - (It helps manage/share state between components)
    - reducers - (It's used to change/update state)
    - selectors - (It's used to select specific data from state based on state parameter which it receives as argument)
    - sagas - (It's middleware which is used to manage async related handling)
      - actions - (It's used to pass information)
      - handlers - (It's used to handle all actions)
      - requests - (It's used to make axios request to server)
      - watchers - (It's used to keep watch on actions and pass on control to handlers whenever specific action is triggered)
    - index.js - (It's used to configure the store based by using root level reducer and saga middleware) 
  - utils
    - auth.util.js - (It's used to manage user auth details)
    - AuthGuard.js - (It's used to protect routes. i.e. Drawing and List)
    - constants.js - (It's used to create and maintain constants that can be used across client side)
  - App.css - (This file keeps css related changes)
  - App.js - (Its kind of home page which include Route related setup)
  - index.js - (It is main file and it's used to render components inside element selected by #id.)


  ### BackEnd (Server)
  - configs - (It contains auth and db related configs)
    - auth.config.js - (It exports auth SECRET_KEY from .env)
    - db.config.js - (It exports all DB related configs from .env)   
  - controllers
    - auth.controller.js - (It is used to manage user signin and singup api requests)  
    - drawing.controller.js - (It is used to manage drawing save, delete and list api requests)  
  - helpers
    - constants.js - (It's used to create and maintain constants that can be used across server side)
    - ErrorHandler.js - (It is centralized error management helpers which manages different types of error)
    - ErrorLogger.js - (It is log any application related errors)
  - loggers - (It uses winston package to manage logs and store into different files based on given levels)
  - middleware - (Middleware are used on specific routes to either proceed with request and deny it with appropriate error messages)
    - auth.jwt.js - (It is used to verify JWT token submitted by client as part of API request)
    - verifySignUp.js - (It is used to check if user already exists into system or not during sing up process)
  - models (It shows representations of table schemas)
    - drawing.model.js - (contains drawing table schema)
    - index.js - (It exports all models)
    - user.model.js  - (contains user table schema)
  - routes - (It is used to maintain routes)
    - auth.routes.js - (It manages all auth related routes eg. signin and singup)
    - drawing.routes.js  - (It manages all auth related routes eg. list drawings, save drawing and delete drawing)
    - index.js - (It exports all routes)
  - services - (It manages all DB related activities/operations)
    - drawing.service.js - (manages all drawing related db operations)
    - user.service.js - (manages all user related db operations)
  - utils
    - httpStatusCodes.js - (exports all expected HTTP status code that needs to be returned as part of API response)
  - index.js - (It's main file which import all above configurations and then configures it while creating express server)

# Trade offs
- User can share the URL with whoever they want. (Just realized that I have missed this point; but it's definitely possible and can be worked.)
- Missing Unit tests (I would like to have unit tests to ensure that there is good amount of good coverage.)

# Usage

- `cp .env.example .env`
- Create Postgres database and assign the respective values to each `.env` variables.
- Do `npm install`
- And then `npm run start-drawing`
- Keep drawing :slightly_smiling_face:


