# Aether Server
This project contains all the backend codes for <b>Aether</b> - <i>Medium of Student and Study</i>.

Express.js, Sequelize is used in this project.

## Database Design
[<img src="database_design.png" height="532"/>](database_design.png)


## Getting Started
### Development Environment
- node.js 14.X
- npm 6.X

### Installing & Configuration
1) Install dependencies
```
    npm install
```
2) change database credential on `config/config.js`
```json
{
    "development" : {
        "username" : "username",
        "password" : "password",
        "database" : "aether_development"
    }
}
```
3) write `node` on terminal and generate random `Secret Number` for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`
4) On terminal paste this code and press enter
```
    require('crypto').randomBytes(64).toString('hex');
``` 
5) create `.env` file on root and paste two generated value as follows
```
    # server port
    PORT=3000

    # environment for production
    NODE_ENV=production

    # authentication
    ACCESS_TOKEN_SECRET=ae9dc2ea3ec0bd564a0aa227f0e7db4ae90df7ab8b2d102bd98ccfc63
    REFRESH_TOKEN_SECRET=8d7014df0afc704c5a9159427b95a6eb42f44d16d658c8e1b4673c61
``` 
**or** , Edit `config/databaseSecrets.json`
```json
{
    "PORT": 3000,
    "NODE_ENV": "development",
    "PASSWORD_SECRET": "secret1",
    "ACCESS_TOKEN_SECRET":"secret2",
    "REFRESH_TOKEN_SECRET": "secret3"
}
``` 

6) Run MySQL server on `apache` or `nginx` 
7) Create a new database and named as `aether_development`

### Run the server
```
    npm run test
```

## APIs

### Auth Route
---

#### Register
`POST /api/auth/register`
```json
{
    "email" : "john@example.com",
    "password" : "123456",
    "type" : "student"
}
```
**Description**: creates a new user; first user will be assigned as an admin user. Password is stored in `HS256` format

```json
{
  "message": "Signed up successfully!",
}
```

#### Login
`POST /api/auth/login`
```json
{
    "email" : "john@example.com",
    "password" : "123456"
}
```
**Description**: logs in to the server. Server will return a JWT token as:
```json
{
  "message": "Login successfully!",
  "type": "student",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJ0eXBlIjoidmVuZG9yIiwiaWF0IjoxNjA4MDY0MTE1LCJleHAiOjE2MDgwNjY4MTV9.tfuZTC3J8D7nCyLYDzO2d6k-uHHwoQOmNtDKipsCySA",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4"
}
```

#### Check
`POST /api/auth/refresh` 
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4

```

**Description**: checks the JWT. Token from `Authorization` from should be passed as Url-encoded query or `x-access-token` header

```json
{
  "message": "Token refreshed Successfully!",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjRAdGVzdC5jb20iLCJ0eXBlIjoidmVuZG9yIiwiaWF0IjoxNjA4MDY0MjkzLCJleHAiOjE2MDgwNjY5OTN9.410H5v_uipB8l7JrNDuOLoCIg__IokGlCukJB99MJO0"
}
```

#### Logout
`POST /api/auth/logout` 
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4

```

**Description**: checks the JWT. Token from `Authorization` from should be passed as Url-encoded query or `x-access-token` header

```json
{
  "message": "Logout successfully!"
}
```


### Student Routes
---

#### Student Profile
GET `/api/student/`
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4
```

**Description**: checks the JWT. Token from `Authorization` from should be passed as Url-encoded query or `x-access-token` header.

```json
{
    "message": "Student Profile updated!",
    "student" : {
        "id" : "75442486-0878-440c-9db1-a7006c25a39f",
        "name": "Harry", 
        "nsuID" : "1712345678",
        "sex": "male",
        "uid": "74, 65", 
        "status": "open",
        "createdAt": "2021-05-31 04:52:14",
        "updatedAt" : "2021-05-31 08:14:21"
    }
}
```

#### Create Student Profile

POST `/api/student/`
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4
```
```json
{
    "nsuID": "1712345678",
    "name" : "Harry",
    "sex": "male",
}
```

**Description**: checks the JWT. Token from `Authorization` from should be passed as Url-encoded query or `x-access-token` header.

```json
{
    "message": "Student Profile updated!",
    "student" : {
        "id" : "75442486-0878-440c-9db1-a7006c25a39f",
        "name": "Harry", 
        "nsuID" : "1712345678",
        "sex": "male",
        "uid": "74, 65", 
        "status": "open",
        "createdAt": "2021-05-31 04:52:14",
        "updatedAt" : "2021-05-31 08:14:21"
    }
}
```

#### Chek Student profile isComplete or not
GET `/api/student/valid`
```http
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXBvbjNAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRqNFUvbnVDLnlwZ2lNRC5Bbk5SdFZ1em53emNWVHpCd2JPTDhTaWlKa1RrbDFnck5SRGE4RyIsInR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2MDgwNjQxMTUsImV4cCI6MTYxMDY1NjExNX0.J6uIMHHCzIhIrZWeB3nyLq7OlfZHJ7-lGhsdstW85J4
```


**Description**: checks the JWT. Token from `Authorization` from should be passed as Url-encoded query or `x-access-token` header.

```json
{
    "isCompleted": true,
    "message": "Profile verification is completed!",
}
```



# License

```
Copyright 2021 Samiur Prapon

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```