# PlacementHub — Student Placement Management System (UI starter)

This is a responsive front-end starter for an Advanced Internet Programming mini project. It uses HTML, CSS and vanilla JavaScript and includes a dashboard, job search/filtering, saved jobs, application tracker, editable demo profile, company directory and learning hub.

## Run it
1. Extract `PlacementHub_Source.zip`.
2. Open the `PlacementHub_Source` folder in VS Code.
3. Open `index.html` in a browser, or install the VS Code **Live Server** extension and choose **Open with Live Server**.
4. No package installation is needed.

## Important
This version is a **front-end demo**. Data is held in JavaScript while the page is open. Login, real resume uploads, permanent storage, and admin controls are not connected to a backend yet. Do not use real personal information.

## Suggested AIP backend next
For a Java-based AIP syllabus, the next version can be connected to:
- Java JSP pages
- Java Servlets for request handling
- JDBC for database connectivity
- MySQL for students, companies, jobs, applications and interview records
- Apache Tomcat for deployment

Suggested future structure:
```
PlacementHub/
  src/java/com/placementhub/
    DBConnection.java
    LoginServlet.java
    RegisterServlet.java
    JobServlet.java
    ApplicationServlet.java
    ProfileServlet.java
  web/
    index.jsp
    login.jsp
    register.jsp
    dashboard.jsp
    jobs.jsp
    applications.jsp
    profile.jsp
    css/style.css
    js/app.js
```
Use a prepared statement for database queries, hash passwords on the server, validate uploaded files, and enforce student/admin permissions on the server. The current sample uses fictional demo content only.
