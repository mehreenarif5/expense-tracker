  💰 Expense Tracker Web Application

 📌 Project Title
Expense Tracker Web Application

 

 📖 Project Description

Expense Tracker is a simple web application developed using Python Flask ,  HTM ,  CSS ,  JavaScrip , and  SQLite . It helps users manage their daily expenses by allowing them to create an account, log in, add expenses, edit or delete expenses, and view expense summaries through charts.

The application provides an easy-to-use interface for tracking personal spending.

 

  🎯 Objectives

- Manage daily expenses easily.
- Store user accounts securely in a database.
- Track monthly expenses.
- Display expense reports using charts.
- Provide a simple and responsive user interface.

 

  🛠 Technologies Used

 Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome
- Chart.js

  Backend
- Python
- Flask Framework

 Database
- SQLite3

 

  📂 Project Structure

 
ExpenseTracker/
│
├── static/
│   ├── style.css
│   └── script.js
│
├── templates/
│   ├── index.html
│   ├── login.html
│   └── signup.html
│
├── app.py
├── db.py
├── expense.db
└── README.md
 

 
 ✨ Features
 User Authentication

- User Signup
- User Login
- Username and Password Validation

  Expense Management

- Add Expense
- Edit Expense
- Delete Expense
- Search Expense
- Monthly Expense Summary

  Charts

- Pie Chart using Chart.js

 User Profile

- Update Username
- Upload Profile Picture

  Other Features

- Dark Mode
- Responsive Design
- Logout
- Export Expense Data

 

  🗄 Database

Database Name:

 
expense.db
 

Table Name:`
users
 

Table Structure

| Column | Data Type |
|---------|-----------|
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| username | TEXT |
| password | TEXT |

 
  ⚙ Installation

  Step 1

Install Python

 Step 2

Install Flask

 `bash
pip install flask
 `
  Step 3

Create Database

 `bash
python db.py
 

  Step 4

Run Application

 bash
python app.py
 
 Step 5

Open Browser
 
http://127.0.0.1:5000
 

 
🔄 Application Flow

1. User opens the application.
2. Login page appears.
3. New users create an account using Signup.
4. User logs in.
5. Dashboard opens.
6. User adds expenses.
7. Expenses are stored.
8. User can edit or delete expenses.
9. Monthly summary and pie chart are updated automatically.
10. User can logout.

---
  📸 Screens

- Login Page
- Signup Page
- Home Dashboard
- Expense List
- Pie Chart
- Settings Page

 

  Future Improvements

- Password Encryption
- Email Verification
- Forgot Password
- Income Management
- Budget Planning
- Export to PDF
- Multi-user Expense Records



👩‍💻 Developed By

Name: Mehreen Arif , Maryam 

Student ID:F2024105297 , f2024105

Semester: 4th Semester

 

 
