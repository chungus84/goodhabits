# GoodHabits

A Microservice Habit Tracking app that helps you to track your daily cardio activities as well as displays your progress.

## Motivation

As someone who has taken up running to improve my personal fitness, I decided to create an app which can help me track my progress and keep me motivated


## Installation

As this uses a microservice architecture, on first installation you will need to install the dependencies for Backend, Auth-backend and frontend.  You will also need to run the seeDb file to populate the databases located in backend folder

```
cd ..
cd auth-backend
npm install
cd ..
cd frontend
npm install
cd backend
npm install
npm run seedDb
```
Once the seedDb file has run you will need to press ctrl + C in the terminal to exit the program.

## Running the App

You will have 3 terminals running for the app to work pointing at backend, auth-backend and frontend

```
backend terminal: run start
auth-backend terminal: run start
frontend terminal: run dev start
```

## Technologies

### Backend
- NodeJs
- Express
- Cors
- Dotenv
- Mongoose
- BodyParser

### Auth-Backend
- JWT
- NodeJs
- Express
- Cors
- Dotenv
- Mongoose
- BodyParser
- bCrypt

### Database
- MongoDB

### Frontend
- React
- Axios
- D3
- Bootstrap
- HTML/CSS

# Features
- Allows Multiple Users to sign-up
- Allows users to create cardio based habits
- Allows users to add events for each habit
- Users can see their progress via a chart
- Uses JWT to authenticate users
- Uses bCrypt to hash passwords

# Features to Implement
- Allow user to create resistance based habits
- Geo-spatial tracking to allow the app to track a users run
