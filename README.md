[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4dd2f8fbea5b4458a6460b6bd5eaa286)](https://app.codacy.com/gh/Smeks-ops/webxwiz-assessment/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

# User Authentication and Two-Factor Authorization Application

This is a small application developed to manage user authentication and two-factor authorization using TypeScript, Apollo Server, Express, MongoDB, and JSON Web Tokens (JWT).

## Table of Contents
- Description
- Features
- Requirements
- Installation
- Usage
- Project Structure
- Security Considerations
- Evaluation Criteria

## Description
This application provides functionalities for user registration, password change, JWT-based user authentication, QR code generation for two-factor authorization, and two-factor login. It is developed using TypeScript, Apollo Server for GraphQL operations, Express for API routes, and MongoDB as the database.

## Features
1. User Registration: Users can create accounts with their email and password, securely stored in MongoDB.
2. Password Change: Users can change their password by providing their old password along with the new one.
3. User Authentication: Authentication is based on JWT, providing users with tokens to access protected resources.
4. Two-Factor Authorization:
- QR Code Generation: Users can enable two-factor authorization, generating a QR code containing their secret key.
- Two-Factor Login: Users can log in using their password and a one-time code from the QR code to enhance security.
## Requirements
- Node.js and npm or Yarn
- MongoDB instance
- Internet connection (for QR code generation)
## Installation
1. Clone this repository.
2. Install dependencies using Yarn:
```
yarn install
```
3. Set up your MongoDB instance and update the .env file with your MongoDB URI.
4. Update other environment variables in the .env file as needed. A .env.example file has been provided in the directory
## Usage
1. Start the server:
```
yarn dev
```

2. Access the GraphQL Playground at http://localhost:4000/graphql.
## Project Structure
The project is organized as follows:

- src/
    - graphql/: Contains the GraphQL schema (typeDefs) and resolvers.
    - models/: Defines the MongoDB data models.
    - helpers/: Includes helper functions for authentication and QR code generation.
    - interfaces/: Includes all typescript interfaces used.
    - index.ts: Entry point of the application.

## Security Considerations
- Passwords are securely hashed using bcrypt before storing them in the database.
- JWT tokens are used for authentication and authorization.
- Two-factor authentication enhances security by requiring an additional code from the QR code.

