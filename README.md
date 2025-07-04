# Blog-APP

A blogging app built with React, where users can discover insightful articles and interact with authors.

This app has two related repositories:
- [**Blog API**](https://github.com/NerdyClimber6969/blog-api) - A RESTful API from which this app **fetches post and comment data**.
- [**Blog Studio**](https://github.com/NerdyClimber6969/blog-studio) - for users to **manage their posts and comments**.

# Table of Contents
- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
- [Acknowledgments](#acknowledgments)

# Live Demo
A live demo of this app can be found [**Here**](https://blog-app-staging.up.railway.app/)

# Project Structure
```
src/
├── App/         # main App component
├── components/  # reusable React components (UI elements, widgets)
├── context/     # React context providers
├── hook/        # custom React hooks 
├── icons/       # svg icons and icon components
├── pages/       # page-level React components (route targets)
├── services/    # API service layer
├── style/       # global css styles and variables
├── main.jsx     # app entry point, renders the root component
├── routes.jsx   # route definitions for React Router
└── utils.jsx    # utility functions and helpers
```

# Features
- Cross-site authentication
- Text search, pagination, sorting functionality
- Loading state animation
- Pop-up messages
- Dark and light themes
- Commenting on each article
- Client-side data validation
- Responsive UI design

# Tech Stack
- [Vite](https://v3.vitejs.dev/) - Build tool that aims to provide a faster and leaner development experience for modern web projects
- [React](https://react.dev/) - Library for web and native user interfaces
- [React Router](https://reactrouter.com/home) - A router library for routing in React projects
- [CSS Modules](https://github.com/css-modules/css-modules) - CSS files where all class names and animation names are scoped locally by default

# Authentication
This app uses JWT (JSON Web Tokens) for authentication. Upon successful login, a JWT is issued and sent to the client as a **cookie** named `accessToken`. This cookie is:

- **HTTP-only**: Not accessible via JavaScript, helping to prevent XSS attacks.
- **Secure**: Only sent over HTTPS connections.
- **SameSite=None**: Allows cross-site requests from your front-end applications.

To access protected endpoints, clients must include the `accessToken` cookie in their requests. The server will automatically verify the JWT from the cookie for authentication and authorization.

**Note:** 
- Make sure your client applications are served over HTTPS to ensure cookies are transmitted
- Make sure the cookie domain matches the client’s domain

# Getting Started
1. Clone this repository
```
git clone https://github.com/NerdyClimber6969/blog-app.git
cd blog-app
```

2. Install dependencies
```
npm install
```

3. Create a .env file and set up environment variables
```
VITE_BACKEND_URL=<URL for Backend>
VITE_STUDIO_URL=<URL for Blog Studio>
```

4. Start the dev server
```
npm run dev
```

# Acknowledgments
- React team
- React community
- JavaScript community
- Node.js community