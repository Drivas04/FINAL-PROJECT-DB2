# FINAL-PROJECT-DB2

Payroll Management System

## Description

This project corresponds to the final assignment for the Databases 2 course (5th semester) at Universidad El Bosque. It is a payroll management system developed individually, integrating modern technologies both in the frontend and backend, and using both relational and non-relational databases.

## Technologies Used

- **Backend:** Java Spring Boot
- **Frontend:** ReactJS
- **Relational Database:** PostgreSQL (with extensions and logic in PL/PgSQL)
- **Non-relational Database:** MongoDB

## Main Features

- Employee registration and management.
- Payroll generation and management.
- Historical data and reports consultation.
- Integration of different database engines.
- User-friendly and responsive web interface.

## Installation and Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Drivas04/FINAL-PROJECT-DB2.git
   cd FINAL-PROJECT-DB2
   ```

2. **Backend (Spring Boot):**
   - Navigate to the backend folder.
   - Install dependencies:
     ```bash
     ./mvnw install
     ```
   - Configure environment variables for PostgreSQL and MongoDB connections.
   - Run the application:
     ```bash
     ./mvnw spring-boot:run
     ```

3. **Frontend (ReactJS):**
   - Navigate to the frontend folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the application:
     ```bash
     npm run dev
     ```

4. **Databases:**
   - Make sure you have both PostgreSQL and MongoDB instances running.
   - Execute the table and function creation scripts in PostgreSQL (located in the `/scripts` folder or the corresponding one).

## Usage Example

1. Log in to the web application.
2. Register employees and their data.
3. Generate payroll and consult historical reports.

## Author

- **Name:** David Rivas Benavides
- **Email:** davidmrivasb2004@gmail.com

## License

This project is for academic use only. You may use it as an educational reference, but not for commercial purposes without permission.

---

Thank you for visiting this repository! If you have suggestions or find any issues, feel free to open an issue.
