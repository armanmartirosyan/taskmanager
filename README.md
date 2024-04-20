# Task Manager

Express.js and MySQL-based Task Manager: Simplify task management with user-friendly features including task creation, editing, and completion tracking.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Accessing the Task Manager UI](#accessing-the-task-manager-ui)
  - [Request/Response Payloads](#requestresponse-payloads)
- [Dependencies](#dependencies)
- [Database Schema](#database-schema)
- [Project Scripts Overview](#project-scripts-overview)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/armanmartirosyan/taskmanager.git
   ```

2. **Install dependencies:**

    This command will install all project dependencies listed in the package.json file

    ```bash
    cd taskmanager
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project, using the provided `.env-example` as a template. Customize the values of the variables in the `.env` file according to your environment and configuration needs. These environment variables are essential for configuring database connections, API keys, and other sensitive information required by the Task Manager application.

4. **Run migrations:**

    This command will execute the database migrations and set up the necessary database schema for the Task Manager application.

    ```bash
    npm run migrate
    ```

5. **Start server:**

    This command will start the server on specified port, allowing users to access the application via their web browsers.

    ```bash
    npm start
    ```

## Usage

### Endpoints

- **GET /api/v1/tasks/**: Use this endpoint to fetch all tasks stored in the database.

- **POST /api/v1/tasks/**: Use this endpoint to add a new task to the database. Send a JSON object with the task details in the request body.

- **GET /api/v1/tasks/:id**: Use this endpoint to retrieve a specific task from the database by providing its ID in the URL path.

- **PATCH /api/v1/tasks/:id**: Use this endpoint to update the state (e.g., completion status) of a task in the database. Send a JSON object with the updated task details in the request body.

- **DELETE /api/v1/tasks/:id**: Use this endpoint to delete a specific task from the database by providing its ID in the URL path.

### Accessing the Task Manager UI

You can access the Task Manager user interface by navigating to [http://localhost:3000](http://localhost:3000)(3000 port by default) in your web browser. This page allows you to create, update, and delete tasks interactively.

### Request/Response Payloads

- **POST /api/v1/tasks/**

   ```json
    {
        "name": "New Task",
        "completed": false
    }

- **Response:**

   ```json
    {
      "id": 1
    }

- **PATCH /api/v1/tasks/:id**

   ```json
    {
        "name": "Old Task",
        "completed": true
    }

- **Response:**

   ```json
  {
    "task": {
      "id": 1,
      "name": "Old Task",
      "completed": 1
    }
  }

For more details on request payloads and responses for each endpoint, please refer to the source code.

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [knex](https://www.npmjs.com/package/knex)

## Database Schema

You'll need to set up a MySQL database with at least the following table:

- tasks
  - id (int, auto_increment, primary key)
  - name (varchar)
  - completed (tinyint)

## Project Scripts Overview

- `"migrate": "npx knex migrate:latest --knexfile ./config/knexfile.js"`: This script executes database migrations to ensure that the database schema is up to date with the latest changes in the project. It uses Knex to manage migrations and runs the migrations defined in the `knexfile.js` configuration file located in the `./config` directory.

- `"rollback": "npx knex migrate:rollback --knexfile ./config/knexfile.js"`: This script rolls back the most recent database migration, reverting the changes made to the database schema. It utilizes Knex to handle the rollback process and operates on the `knexfile.js` configuration file in the `./config` directory.

- `"start": "node app.js"`: This script starts the application by running the `app.js` file using Node.js. It is typically used in a production environment to launch the application server.

- `"dev": "nodemon app.js"`: This script is intended for development purposes. It utilizes Nodemon to monitor changes to files and automatically restarts the server when changes are detected. It runs the `app.js` file, facilitating a smoother development workflow.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
