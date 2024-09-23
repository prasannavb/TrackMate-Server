# TrackMate

Welcome to the **TrackMate**, your go-to solution for managing employee attendance with ease! This platform allows employees to log in with their unique ID, mark their attendance, view records by year and month, and manage their attendance history effortlessly. It streamlines attendance tracking with automatic date recognition and user-friendly features for correcting errors.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Usage](#usage)

## Features
- **Login**: Employees can securely log in using their unique ID to access the system.
- **Automatic Date Detection**: Upon logging in, the current date is automatically displayed for easy attendance marking.
- **Mark Attendance**: Employees can mark themselves as present for the day by clicking a button.
- **Monthly & Yearly Overview**: The app provides a detailed breakdown of attendance for each month and year, showing the number of days present and a list of the dates.
- **Manage Attendance**: If a date is incorrectly marked, employees can easily delete the wrong entry.
- **Secure Logout**: Employees can securely log out of the system after managing their attendance.

## Demo
A demo of the Attendance Tracker System is available [here](#).

## Tech Stack

- **HTML**: The standard markup language for creating web pages. HTML provides the structure and content of a web page.
- **CSS**: Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in HTML. CSS enhances the appearance and layout of web pages.
- **React.js**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for building APIs.
- **MongoDB(Atlas)**: A cloud-based NoSQL database for storing application data.
- **Vite**: A fast build tool for modern web development.
- **Netlify**: A cloud platform for hosting static websites, including client-side applications.
- **Vercel**: A cloud platform for hosting serverless functions and full-stack applications, including server-side applications.

## Folder Structure

- **client/**: Contains the frontend React application.(https://github.com/prasannavb/TrackMate.git)
- **Server/** Contains the backend Node.js application.(https://github.com/prasannavb/TrackMate-Server.git)
- **public/**  Contains static assets for the frontend application.
- **src/** Contains the source code for both frontend and backend applications.

## Database Schema

The MongoDB database is designed with collections like:

- **Users**: Stores user (employee) details such as ID, name, and login credentials.
- **Attendance**: Stores attendance records, including dates and status (present/absent).

## Usage

The **TrackMate** is designed to make employee attendance management straightforward and efficient. With automatic date recognition and a simple one-click interface for marking attendance, it reduces human error and provides employees with a quick overview of their records.

This system is ideal for companies looking for a minimalistic and efficient way to handle attendance tracking, with features for correcting mistakes and managing records across different time periods.

# Copyright ©2025 All rights reserved|Designed by Prasanna V B
