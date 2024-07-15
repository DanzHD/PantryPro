# Pantrypro

Pantrypro is a meal planning, scheduling and tracking application. It provides the following features:
- **Food Expiry Alerts**: Tracks food stored in the database and sends an email alert when your food is about to expire
- **Meal Scheduling**: Ability to schedule weekly meals and provides recipes associated with such meals
- **Food Tracking**: Provides easy to use graphical interface for viewing, searching, filtering and adding food 


## Stack
Frontend: `react@latest`

Backend: `Java Springboot`

Authentication: `jwt`

Database: `MySQL`

Cloud: `AWS`
## Screenshots
| | |
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="screen shot 1" src="https://github.com/user-attachments/assets/6a580eea-57cd-4a45-8112-b5033b17adb8"> |  <img width="1604" alt="screen shot 2" src="https://github.com/user-attachments/assets/781da2b9-cea2-462a-934f-075da9829d33">|
|<img width="1604" alt="screen shot 3" src="https://github.com/user-attachments/assets/d3cd38e6-9a19-4aa9-bf96-729ad6d73209">  |  <img width="1604" alt="screen shot 4" src="https://github.com/user-attachments/assets/8c10eece-9a3b-406a-b98b-81455086c49a">|
|<img width="1604" alt="screen shot 5" src="https://github.com/user-attachments/assets/93bb9f57-67d0-49df-9dd1-6cc942b796d2">  | <img width="1604" alt="screen shot 6" src="https://github.com/user-attachments/assets/e614d6ed-2d45-4822-a929-3a7f77c6ce50">|

## Getting started

### Environment Variables

#### Backend Required
- `SQL_HOST`: The connection url for a MySQL server. Should begin with jdbc:mysql, contain the port and database. E.g. jdbc:mysql://localhost:3306/pantrypro
- `DB_USERNAME`: The username of a user for the MySQL server
- `DB_PASSWORD`: The password of the user for the MySQL server
- `SMTP_HOST`: The host url of an mail server
- `SMTP_USERNAME`: The username of a user for the SMTP server
- `SMTP_PASSWORD`: The password of the user for the SMTP server
- `SECRET_KEY`: A HS256 generated string

### Start
#### Client
'docker compose up' from project directory 
#### Backend
'mvn spring-boot:start' from server directory after setting up environment variables
