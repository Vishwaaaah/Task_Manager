# Task Manager Application Documentation

## Overview
The Task Manager application is a full-stack JavaScript application that allows users to manage their tasks. It is built using Next.js for the client-side and Express.js for the server-side. The application provides a user interface for creating, reading, updating, and deleting tasks.

## Client-Side
The client-side of the application is built using Next.js. The main page for managing tasks is implemented in `Task_Manager/client/app/tasks/page.tsx`. This page includes a form for adding new tasks, a calendar view for visualizing tasks, and a list view for managing all tasks.

The form for adding new tasks uses several components from `Task_Manager/client/components/ui/form.tsx`, including `Form`, `FormControl`, `FormDescription`, `FormField`, `FormItem`, `FormLabel`, and `FormMessage`.

The calendar view uses the `FullCalendar` component to display tasks in a monthly grid.

The list view displays all tasks in a grid. Each task is represented by a `Task` component, which includes a checkbox for marking the task as completed and a button for deleting the task.

## Server-Side
The server-side of the application is built using Express.js. The main server file is `Task_Manager/server/index.js`, which sets up middleware, connects to the database, and starts the server.

The server provides several routes for managing tasks, implemented in `Task_Manager/server/routes/taskRoutes.js`. These routes include:

- `POST /tasks`: Create a new task
- `GET /tasks`: Get all tasks for the current user
- `GET /tasks/:id`: Get a specific task by its ID
- `PATCH /tasks/:id`: Update a specific task by its ID
- `DELETE /tasks/:id`: Delete a specific task by its ID

The logic for handling these routes is implemented in `Task_Manager/server/controllers/taskController.js`.

## Running the Application
To run the client-side of the application, navigate to the `Task_Manager/client` directory and run the following command:

```sh
npm run dev
```
To run the server-side of the application, navigate to the Task_Manager/server directory and run the following command:

Further Reading
For more information about the technologies used in this application, see the following resources:

Next.js Documentation
Express.js Documentation
```