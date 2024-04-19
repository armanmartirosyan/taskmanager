# Task Manager

Express.js and MySQL-based Task Manager: Simplify task management with user-friendly features including task creation, editing, and completion tracking.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Request/Response Payloads](#requestresponse-payloads)
- [Dependencies](#dependencies)
- [Database Schema](#database-schema)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/armanmartirosyan/taskmanager.git
   ```

2. **Install dependencies:**

    ```bash
    cd taskmanager
    npm install
    ```

## Usage

### Endpoints

- **GET /api/v1/tasks/**: Get all tasks from database.
- **POST /api/v1/tasks/**: Create a new task and store it to database.
- **GET /api/v1/tasks/:id**: Get task from database by id.
- **PATH /api/v1/tasks/:id**: Update the state of task.
- **DELETE /api/v1/tasks/:id**: Delete task.

### Request/Response Payloads

- **POST /auth/login**

   ```json
    {
        "email": "user@example.com",
        "password": "password"
    }

- **Response:**

   ```json
   {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   }

For more details on request payloads and responses for each endpoint, please refer to the source code.

## Dependencies

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql2](https://www.npmjs.com/package/mysql2)

## Database Schema

You'll need to set up a MySQL database with at least the following table:

- users
  - id (int, auto_increment, primary key)
  - name (varchar)
  - completed (tinyint)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
