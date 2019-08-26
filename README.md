# fancy-todo
## Fancy Todo 
Build with express,Bootstrap, JQuery, RESTful API.

#### USER ROUTES 

| Routes        | HTTP           | Header(s) | Body| Description | Success | Error|
| ------------- |:-------------:| :-----:| ---- | --- | ---| ---|
| /siginin | POST | none | {email:String, password:String} | login with registration | Status: 200 <br> dataTypes:{} | Status:401 <br> dataTypes:{}
| /googlesignin | POST | none | google-token | login via googles | Status : 201/200 <br> Datatypes: {} | Status: 500, dataTypes: {}
| /register | POST | none | {username: String, <br> email:String, <br> password:String} <br> | Register  | Status: 201 <br> Datatypes: {} | Status : 500 <br> Datatypes: {}



#### TODO ROUTES: (User need to be signed in to access the routes)
| Routes        | HTTP           | Header(s)    | Body | Description | Success | Error
| ------------- |:-------------: | :---:        | ---- | ---         | ---     | ---|
| /todos         | GET            | token:String | none | Get all the task of specific user | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /todos         | POST           | token:String | name:String  <br>dueDate:String <br>description:String  <br> | Create a new todo| Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /todos/:id         | PUT           | token:String | name:String  <br>dueDate:String <br>description:String  <br> | Edit a todo based on _id | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /todos/:id | DELETE | token:String | none | Delete a todo based on _id | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} |  
| /todos/:id | PATCH | token:String | none | Update a task to complete status or to uncomplete status based on _id | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} | 
| /todos/calender | GET | none | none | show holiday date | Status:200<br>dataTypes:{} | Status:500<br> dataTypes: {} | 
| | | | | | 

## Usage
Make sure Node.js is installed in your computer then run these commands:

> `$ npm install` <br>
> `$ npm start` <br>
> `$ npm run dev` <br>


## How this Todo Work
* The task form is required to be filled. 
* User must be logged in to view todo.
* The data will be saved on database.