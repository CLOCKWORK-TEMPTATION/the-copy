# TheCopy - Blueprint

## Overview

TheCopy is a web application for copywriters to manage their projects and scripts. It provides a secure and organized environment to store, analyze, and track their work.

## Features

- **Authentication:** Secure user registration and login with JWT authentication.
- **Project Management:** Create, view, and delete projects to organize scripts.
- **Script Management:** Upload scripts and store them in a PostgreSQL database.
- **Script Analysis:** Basic script analysis placeholder in MongoDB.

## Backend Architecture

- **Framework:** ASP.NET Core
- **Database:**
    - PostgreSQL for structured data (Users, Projects, Scripts).
    - MongoDB for unstructured data (Script Analysis).
- **Authentication:** JWT Bearer Tokens.
- **Services:**
    - `AuthService`: Handles user registration and login.
    - `MongoService`: Manages interactions with MongoDB.
- **Controllers:**
    - `AuthController`: Exposes registration and login endpoints.
    - `ProjectsController`: Manages project-related operations.
    - `ScriptsController`: Handles script uploads and analysis placeholders.

## Frontend (To be implemented)

- **Framework:** Vue.js (or similar modern frontend framework).
- **Styling:** Tailwind CSS (or similar utility-first CSS framework).

## Current Plan

- The current focus is on building the backend infrastructure.
- The next step is to develop the frontend application to interact with the backend APIs.
