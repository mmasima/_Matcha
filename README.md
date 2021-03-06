## MATCHA

```diff
# Is a WeThinkCode_ project.
```


<hr />

<em>To get project subject:</em> [Matcha Subject!](https://github.com/wethinkcode-students/web/blob/master/2%20-%20matcha/matcha.en.pdf)<br />
<em>To get project marking sheet:</em> [Matcha Marking Sheet!](https://github.com/wethinkcode-students/web/blob/master/2%20-%20matcha/matcha.markingsheet.pdf)

<hr />

<h2> Description </h2>

 ```diff
 This project is about creating a dating website.
 The app allows two potential lovers to meet, from the registration to the final encounter.
 A user is able to register, connect, fill his or her profile, search and look into the profile 
 of other users, like them, chat with those that "liked" back.
```


<hr />

<h2> Features</h2>  

```
- Registration and Signing-in
- User profile
- Browsing
- Research
- Profile of other users
- Chat
- Notifications
```
<hr />

<h2> Stack || Languages</h2> 

<h3> Front-End: </h3>

```diff
# JavaScript (ES6+)
# HTML
# CSS
# Bootstrap
```

<h3> Server: </h3>

```diff
# Node JS
# Express JS
```
  
<h3> Back-End: </h3>

```diff
# MySQL database
```

<hr />

<h2>Front-End NPM Packages :package::package::package:</h2>
<em>for package versions: npm install package_name</em>

 <ul>
    <li>
      <em>
        <strong>
          Socket.io
        </strong>
       </em>
    </li>
    
```diff
# enables real-time, bidirectional and event-based communication between the browser and the server
```
    
   <li>
      <em>
        <strong>
          connect-flash
        </strong>
       </em>
    </li>
    
```diff
# ensuring that the message is available to the next page that is to be rendered.
```
  
<hr />

<h2>Back-End NPM Packages :package:</h2> 

  <ul>
   <li>
      <em>
        <strong>
          bcrypt-nodejs:
        </strong>
       </em>
    </li>
    
```diff
# password hashing, encryption and decryption
```

   <li>
      <em>
        <strong>
          body-parser:
        </strong>
       </em>
    </li>
    
```diff
# extracts the entire body portion of an incoming request stream and exposes it on req.body.
```

   <li>
      <em>
        <strong>
          cors:
        </strong>
       </em>
    </li>
    
```diff
# Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
```

  <li>
      <em>
        <strong>
          cloudinary:
        </strong>
       </em>
    </li>
    
```diff
# cloud database that store images
```

  <li>
      <em>
        <strong>
          dotenv:
        </strong>
       </em>
    </li>
    
```diff
# used with .gitignore to hide configurations and api keys from being shared on github
```

  <li>
      <em>
        <strong>
          express:
        </strong>
       </em>
    </li>
    
```diff
# for creating a server and back-end routing
```

  <li>
      <em>
        <strong>
          express-form-data:
        </strong>
       </em>
    </li>
    
```diff
# sends form to the server
```

  <li>
      <em>
        <strong>
          knex:
        </strong>
       </em>
    </li>
    
```diff
# connects to database to store or fetch data
```

  <li>
      <em>
        <strong>
          nodemon:
        </strong>
       </em>
    </li>
    
```diff
# listens to file changes and restarts server during development if they are any changes made to the file
```

  <li>
      <em>
        <strong>
          nodemailer:
        </strong>
       </em>
    </li>
    
```diff
# sends email to the user after registration or request for password reset
```

  <li>
      <em>
        <strong>
          pg:
        </strong>
       </em>
    </li>
    
```diff
# Mysql database stores information of all users
```

<li>
      <em>
        <strong>
          randomstring:
        </strong>
       </em>
    </li>
    
```diff
# works as string shuffle mechanism e.g to generate tokens used during email verification process
```

  </ul>

<hr />

<h2> Project Structure </h2>

<h3> Front-End: </h3>

- components
   - auth
   - bio
   - chat
   - dashboard
   - extendedprofile
   - footer
   - map
   - nav
   - notifications
   - port
   - profile
   - scrollbar
   - update
   - upload
   - user
   - App.css
   - App.js
     
<h3> Back-End: </h3>

```diff
+ End Points where front-end request are processed e.g inserting user to database
```

 - controllers
   - GetData.js
   - Interations.js
   - Upload.js
   - Update.js
   - Messages.js
   - Register.js

```diff
+ port at which front-end runs
```

 - port
   
```diff
+ Connects app to database and allows data to be inserted and fetched from database
```

 - server.js
   
```diff
+ Sends mail to user for registration and password reset
```

 - mailer.js
 
```diff
+ hides api keys from github
```
