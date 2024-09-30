# Student Management System

This repository contains two implementations of a Student Management System: one using **Express.js** and another using **Laravel Breeze**. Each implementation secures user passwords using `bcrypt` and manages student data through respective backend databases.

## Technologies Used
1. **Express.js (Node.js)** for backend (JavaScript-based).
2. **Laravel Breeze (PHP)** for backend (PHP-based).
3. **bcrypt** for password security (both in Express.js and Laravel Breeze).

## Express.js Implementation

- **Password Security**: `bcrypt` with a salt of 10 rounds (`bcryptjs` node module).
- **Database Information**: SQL queries are stored in `db.sql`.
- **API**: Defined in `endpoint.js`.
- **Routes**: Defined in `index.js`.
- **Frontend**: Located in the `frontend/` folder.
- **Video Demo**: [`Student Management - Google Chrome 2024-09-30`](./express/Student-Management-Google-Chrome-2024-09-30-17-04-49.mp4)

## Laravel Breeze Implementation

- **Password Security**: PHP's built-in `Hash::bcrypt()` with a salt of 12 rounds.
- **Database Information**: 
    - Migrations are located in `database/migrations/`, but are **not published in this repository**.
    - Models:
      - `Student.php`: `app/Models/Student.php`
      - `User.php`: `app/Models/User.php`
- **API**: Defined in `app/Http/Controllers/*`.
- **Routes**:
    - `routes/auth.php`: Handles authentication routes.
    - `routes/web.php`: Handles web routes.
- **Frontend**: Located in the following folders:
    - `resources/`: Contains view templates, CSS, and JavaScript files.
    - `public/`: Contains public assets (e.g., images, stylesheets).
- **Video Demo**: [`Laravel - Google Chrome 2024-09-30`](./laravel_breeze/Laravel-Google-Chrome-2024-09-30-17-19-23.mp4)
