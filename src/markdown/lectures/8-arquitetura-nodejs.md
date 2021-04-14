---
number: 12
path: '/lectures/12-nodejs-api-best-pratices'
date: '2021-04-14'
title: 'Best practices for Node.js REST API design'
hidden: false
---

class: center, middle, block-text

# Best practices for Node.js REST API design

Programação para Internet II - ADS 2020.2

Prof. @jesielviana

---
# Use HTTP Methods & API Routes
- POST /users to create a new user,
- GET /users to retrieve a list of users,
- GET /users/:id to retrieve a user,
- PATCH /users/:id or PUT /users/:id to modify an existing user record,
- DELETE /users/:id to remove a user.

---

# Use HTTP Status Codes Correctly
- 2xx, if everything was okay,
  - 200 Get ok
  - 201 Post ok
- 3xx, if the resource was moved,
- 4xx, if the request cannot be fulfilled because of a client error
  - 400 Bad Request – This means that client-side input fails validation.
  - 401 Unauthorized – This means the user isn’t not authorized to access a resource (i.e.: user isn’t authenticated)
  - 403 Forbidden – This means the user is authenticated, but it’s not allowed to access a resource.
  - 404 Not Found – This indicates that a resource is not found.
- 5xx, if something went wrong on the API side.

  ---

#  Use HTTP headers to Send Metadata
- authentication
- pagination,
- data type.

---

# Create Integration Test for yours REST APIs endpoints (Black-Box Tests)

- express
- supertest

---

# Create a Proper API Documentation
- Swagger
- apidocjs

---

# Versioning our APIs
- /api/v1/users
-  /api/v2/users

---

# Take care of the Security of your application
- using SSL/TLS for security is a must.
- use Helmet

---

# Accept and respond with JSON
- app.use(express.json())

---

# References

- [10 Best Practices for Writing Node.js REST APIs | @RisingStack](https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/)
- [Best practices for REST API design - Stack Overflow Blog](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)

---

class: center, middle, block-text

# Boas práticas de arquitetura Node.js

Programação para Internet II - ADS 2020.2

Prof. @jesielviana
