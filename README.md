[![Build Status](https://travis-ci.org/emp-daisy/EventManager.svg?branch=develop)](https://travis-ci.org/emp-daisy/EventManager)
[![Coverage Status](https://coveralls.io/repos/github/emp-daisy/EventManager/badge.svg)](https://coveralls.io/github/emp-daisy/EventManager)
[![Maintainability](https://api.codeclimate.com/v1/badges/591a74ef49e750779bcf/maintainability)](https://codeclimate.com/github/emp-daisy/EventManager/maintainability)


# Event Manager

Event Manager System for handling booking of events

This system will manage creating of events by differnt users in locations created by the administrator

### Demo Application
[Click to Demo](https://jess-event-system.herokuapp.com/)

### API Documentation
 _Set SCHEME to **HTTPS**_  
[View Demo API doc](https://jess-event-system.herokuapp.com/v1/api-docs/)

### Installation Guide
*   Install [node](https://nodejs.org/en/download/) version 6 or higher

*   Install and setup [posgresql](https://www.postgresql.org/download/)

*   Clone this repo and navigate to the location

    -   `$ git clone https://github.com/emp-daisy/EventManager.git`

*    Install all dependencies
     -  `$ npm install`

*   Set up database for the application  
        
        Navigate to server/config.config.json  
        Edit credentials for development

*    Run migration and seed the database with nesseccary data
        ```
        $ npm run migrate
        $ npm run seed
        ```

*   Start the application
    -    `$ npm run dev`

*   Open on browser browser
    -   `localhost:3088`

### Running The Tests
#### server test
`npm run test:local:server`
#### client test
`npm run test:client`
#### e2e test
```
Run one seperate terminals

$ npm run e2e:server 
$ npm run e2e 
```

### Features
*   New users can create account with email and password
*   Newly registered users must be verified by email
*   Verified users can login to access restricted functionalities
*   Admin can create, update or delete centers
*   All authenticated users can create, modify or delete their events
*   Any user can view the available centers
*   Users can request for password reset

### Limitations
*   Only authenticated users can access key features such as event booking  
*   User cannot delete their account  
*   Only one admin available

### Built With
[NodeJS](https://www.nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

[ExpressJS](https://www.expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

[Sequelize](http://www.docs.sequelizejs.com/) - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL and features solid transaction support, relations, read replication and more

[PosgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.

[ReactJS](https://www.reactjs.com/) - A JavaScript library for building user interfaces

[Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.

[Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS.

## Author
-   [Jessica](https://github.com/emp-daisy/)

## License
This project is licensed under [MIT](https://github.com/emp-daisy/EventManager/blob/add-mit-license/LICENSE).

## Contribution
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the author of this repository before making a change.

## Acknowledgment
-   All technologies & dependencies used in this application
