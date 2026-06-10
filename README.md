# Music Controller
Music Controller is a web application that allows multiple users to control a collaborative music playback queue. The application features a room-based system where a host can create a session, and guests can join to vote on skipping songs or controlling playback. It uses Django for the backend API and React for the user interface.

# Features
Room creation and joining management
Collaborative music queue control
Customizable guest playback permissions (skip votes threshold, pause/play authority)
Real-time room state synchronization
Integration with third-party music APIs

# Tech Stack
Backend: Python, Django, Django REST Framework
Frontend: JavaScript, ReactJS, Material-UI, Webpack, Babel

# Prerequisites
Before running the project, ensure you have the following installed:
Python 3.10 or higher
Node.js and npm

# Running the Application
To run the application locally, you need to start both the Django development server and the Webpack compiler.

## Start Backend Server
From the project root directory (with the virtual environment activated):
python manage.py runserver

## Start Frontend Compiler
From the frontend directory, run the development script to compile the React code:
npm run dev