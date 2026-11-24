# Student Attendance Manager — Web (Next.js)

A full-stack web application for managing students, grades and absences, built with **Next.js**, **React**, **Material UI** and **MongoDB**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![MUI](https://img.shields.io/badge/Material_UI-5-007FFF?logo=mui)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?logo=mongodb&logoColor=white)

## Features

- **Authentication**: login page for teachers
- **Students**: add, view and delete students, and list them by classroom
- **Grades**: add and delete grades (subject, exam date, coefficient)
- **Absences**: track absences with a reason and a justification status
- **Teachers**: list of teachers and teacher detail pages
- REST API built with Next.js API routes (`/api/addStudent`, `/api/getGrades`, `/api/studentByClassRoom`…)
- Data tables with MUI X Data Grid

## Tech stack

| Layer    | Technology                                 |
|----------|--------------------------------------------|
| Frontend | React 18, Next.js 14 (Pages Router), MUI 5 |
| Backend  | Next.js API routes                         |
| Database | MongoDB with Mongoose                      |

## Project structure

```
src/
├── models/      # Mongoose schemas (Student, User, Prof)
├── pages/       # Pages and API routes
│   └── api/     # REST endpoints
├── sections/    # UI components (student, grade, prof)
└── tools/       # Utilities
db.js            # MongoDB connection
```

## Getting started

**Requirements:** Node.js 18+ and a MongoDB database (local or MongoDB Atlas).

```bash
git clone https://github.com/charif6102/Student-Attendance-Manager-React.git
cd Student-Attendance-Manager-React
npm install
```

Create a `.env.local` file at the root:

```
MONGODB_URI=mongodb://localhost:27017/student-management
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Related projects

The same application exists in other stacks:

- [Java RMI version](https://github.com/charif6102/Student-Attendance-Manager-Java)
- [C# WinForms version](https://github.com/charif6102/Student-Attendance-Manager--C--)
