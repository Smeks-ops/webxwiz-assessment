User Authentication and Two-Factor Authorization Application
This is a small application developed to manage user authentication and two-factor authorization using TypeScript, Apollo Server, Express, MongoDB, and JSON Web Tokens (JWT).

Table of Contents
Description
Features
Requirements
Installation
Usage
Project Structure
Security Considerations
Evaluation Criteria
Description
This application provides functionalities for user registration, password change, JWT-based user authentication, QR code generation for two-factor authorization, and two-factor login. It is developed using TypeScript, Apollo Server for GraphQL operations, Express for API routes, and MongoDB as the database.

Features
User Registration: Users can create accounts with their email and password, securely stored in MongoDB.
Password Change: Users can change their password by providing their old password along with the new one.
User Authentication: Authentication is based on JWT, providing users with tokens to access protected resources.
Two-Factor Authorization:
QR Code Generation: Users can enable two-factor authorization, generating a QR code containing their secret key.
Two-Factor Login: Users can log in using their password and a one-time code from the QR code to enhance security.
Requirements
Node.js and npm or Yarn
MongoDB instance
Internet connection (for QR code generation)
Installation
Clone this repository.
Install dependencies using Yarn:
Copy code
yarn install
Set up your MongoDB instance and update the .env file with your MongoDB URI.
Update other environment variables in the .env file as needed.
Usage
Start the server:
sql
Copy code
yarn start
Access the GraphQL Playground at http://localhost:4000/graphql.
Project Structure
The project is organized as follows:

src/
graphql/: Contains the GraphQL schema (typeDefs) and resolvers.
models/: Defines the MongoDB data models.
routes/: Manages the Express routes for the API.
helpers/: Includes helper functions for authentication and QR code generation.
index.ts: Entry point of the application.
Security Considerations
Passwords are securely hashed using bcrypt before storing them in the database.
JWT tokens are used for authentication and authorization.
Two-factor authentication enhances security by requiring an additional code from the QR code.
Evaluation Criteria
The evaluation of the test task will consider the following criteria:

Compliance with the specified requirements and functionality.
Code quality, organization, and comments.
Adherence to SOLID principles in design and development.
Proper handling of security concerns, such as password hashing and data protection.
Proficient use of TypeScript and Apollo GraphQL.
For the solution, please refer to the GitHub repository: GitHub Repository Link

Good luck with the assignment! If you have any questions or need further assistance, feel free to reach out.