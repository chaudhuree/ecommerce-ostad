- create context for saving user login information
- use localstorage in registratiion and login page to save data in localstorage
- also use setAuth in login and register page to see the current state change in the navbar. without using setAuth to see the changes we have to reload the page
 
 - set private routing system
  - two type of verification is used.
   - 1. from the client side
   - 2. from the server side
     - for server side we have used http://localhost:8000/api/v1/auth-check route

- private roting system also has an example of testing in the app.jsx
- loading component is created and used to redirect if the user is not authorized

