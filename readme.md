# ToDo App

A simple ToDo App built using Node.js, Express, MongoDB , and React.

## Description

This ToDo App allows users to manage their tasks efficiently. It includes features such as adding, updating, deleting, and listing ToDo items. Additionally, it offers server-side and client-side validations for adding and updating tasks, along with filtering options for Done and Upcoming tasks.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment](#environment)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.

## Installation

1. **Clone the repository:**

   ```shell
   git clone https://github.com/Arun1only1/todo.git

   ```

2. **Install client-side necessary packages:**

   Change to front directory and run `npm install`

3. **Install backend necessary packages:**

   Change to todo-api directory and run `npm install`

4. **Run dev server:**

   Run `npm run dev` on both front and todo-api

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**On todo-api(backend)**

- `API_PORT`
- `MONGO_URL`
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRES_IN`
- `JWT_REFRESH_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_EXPIRES_IN`

**On front(client-side)**

- `VITE_API_BASE_URL`
