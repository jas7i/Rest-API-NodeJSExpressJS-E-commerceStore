#Rest-API-NodeJSExpressJS-E-commerceStore

This is Rest API built in Nodejs -Express using MonogoDB with all the Routes e.g Create User,
Login a user, Delete User, JWT token Authentication, CRUD on Products, Crud on Orders (Update Order is not included) etc.

Follow these steps to setup it on your Localhost/yourMachine.

1. Clone the Git project to your Local Machine.
2. After Cloning the Project you need to Run the command into current Project directory npm install . which will install all the required package for this project.
4. After Cloning the Project You need to change the MongoDB url With your Real MongoDB Cluster url ,Either you can use MongoDB Compass Locally.
5. Now to change the URL go to app.js File and Replace this url with your realOne.

  ![ScreenShot](/img/mongo.png)
  
5. After replacing the MongoDB URL you need to create a .env File on root directory in project.
6. Now copy all the code from config.js and paste it to .env File.
7. Now start your server by npm start command , You will successfully Run the API in Postman awa ChromeBrowser.



