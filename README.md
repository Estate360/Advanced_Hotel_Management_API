# Advanced_Hotel_Management_API

This code is a one step forward of the [Hotel_Management_API](https://github.com/Estate360/Hotel_Management_API) repository I uploaded last.

## Changes to Expect:

Here;

1. I went further to build a system of USERS, assigning the role of GUEST and ADMIN to them.
2. I further more ensured that I the Authentication and Authorization middleware is second to none by efficiently applying bcrypt, jwt.
3. I used "joi" to ensure solid validation.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Important Library Links

- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [BCRYPT](https://www.npmjs.com/package/bcrypt)
- [JOI](https://joi.dev/api/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

1. Run `git clone https://github.com/Estate360/Advanced_Hotel_Management_API` to clone the repository to your local machine.

2. Run `cd hotel-management-api` to navigate to the cloned repository directory.

3. Run `npm install` to install the required dependencies.

4. Run `npm run dev` to start the server.

The API should now be running at http://localhost:5000 or http://localhost:8800.

## API Endpoints

The API provides the following endpoints:

- POST /api/v1/users/register:
  Creates/registers a new user
- POST /api/v1/users/login:
  Logs a user in
- GET /api/v1/users:
  Gets all users
- PATCH /api/v1/user/:id :
  Updates a user info
- DELETE /api/v1/user/:id :
  Deletes a user
- GET /api/v1/user/:id :
  Gets a a particular user by ID

## Contributing

If you're interested in contributing to this project, please feel free to fork the repository and make any changes you like. Once you're ready, submit a pull request to have your changes reviewed and merged into the main branch.

### License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for more information.

#### Leave a Star ⭐️ if you find this helpful or worth a Start
