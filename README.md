# Task Garden
Link: https://taskgardensei29.herokuapp.com/

![screenshot](https://imgur.com/RexudNn.png)

## Description
This is the Task Garden. It is an application that reward users when they complete their tasks. The rewards come in the form of 'growth' for your virtual plants that can be planted on your virtual farm(Garden). Various plants can be bought from the shop(Florist). The currency is earned by completing daily tasks(dailies) that are generated at random by the application.
  
After a user registers or log in, they will be brought to the dashboard. This is where a user can manage their tasks. They can add tasks, complete tasks, delete tasks and archive completed tasks. 
  
A feature of the Task Garden is upon creation of a task, the user will decide the urgency and importance of the task. This will help users prioritise the tasks that needs to be done. Each task upon creation can be assigned to a plant that has already been planted in the Garden. When a task that is assigned to a plant has been completed, the plant itself gains 'growth'. When 'growth' has maxed out, the plant will evolve from a sapling to a beautiful plant. Enjoy being productive!

## General Approach

### Design

The overall theme of the application is focus and simplicity. 

We want users to have clarity over their daily tasks in a non-cluttered environment with simple no-nonsense classification of importance and urgency

At the same time, we want to motivate users to carry out tasks. Although completing tasks are rewards in their own right, we want to allow the user to visualise the mountains of work they actually accomplish so they don't lose sight of how awesome they are.

We achieve this by allowing users to tie tasks to plants in their garden, and every time they complete their tasks, that plant will grow.

However, we also want to encourage getting out of the comfort zone and usual humdrum and decided to give the user the option of performing a daily task. 

These daily tasks are meant to be simple to complete and earns them coins which they can use to buy plants at the florist.

Do Dailies > Buy Plants > Add Tasks > Do Tasks > Grow Plants > Repeat

Simple.

### Ownership

This is app is just as much about work prioritisation as it is about personal growth. 

Inculcating good habits and visualising their accumulated efforts over the years requires us to allow users to create accounts that save their tasks and progress.

### Security

To ensure security for the app, every route (page/action) is checked for the proper authentication using jwt.

### Responsiveness

As this is a relative lightweight app, and we wanted to allow the logging of tasks on-the-go (so that the user doesn't forget to add it later), the pages are designed to work on smaller screen sizes as well.


## Planning and Development Process

### Technologices Used

This app was constructed with the following technologies:
```
Front-end:
- ReactJS: A JavaScript library for building user interfaces.  

Back-end:
- MongoDB: A source-available cross-platform document-oriented, NoSQL database program.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: Fast, unopinionated, minimalist web framework for node.
```
#### Dependancies
#### Front-end:
##### React Bootstrap
The most popular front-end framework rebuilt for React. To install:
```javascript
npm install react-bootstrap bootstrap@4.6.0

{/* The following line can be included in your src/index.js or App.js file*/}
import 'bootstrap/dist/css/bootstrap.min.css';
```
##### Axios
Promise based HTTP client for the browser and node.js. To install:
```javascript
npx i axios
```
##### Redux
Redux is a predictable state container for JavaScript apps. To install:
```javascript
npx i --save redux
```
##### Moment
A JavaScript date library for parsing, validating, manipulating, and formatting dates. To install:
```javascript
npx i moment
```
##### Date-FNS
A Modern JavaScript date utility library. To install:
```javascript
npx i date-fns
```
##### React Datepicker
A simple and reusable Datepicker component for React using Date-FNS. To install:
```javascript
npx i react-datepicker --save
```

#### Back-end:
##### JsonWebToken
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. To install:
```javascript
npx i jsonwebtoken
```
##### Bcrypt
A library to help you hash passwords. To install:
```javascript
npx i bcrypt
```
##### Passport
Passport is Express-compatible authentication middleware for Node.js. To install:
```javascript
npx i passport
```
##### Mongoose
Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. To install:
```javascript
npx i mongoose
```

### User Stories

Users will see this when they enter the application. They will be logged in automatically after registering.
![screenshot](https://i.imgur.com/pwsYOfE.png)

Once logged in, they will be brought to their dashboard.
![screenshot](https://i.imgur.com/mxOM0ik.png)
Here they can access the Florist, Garden, manage their tasks and complete the Dailies.
* Users can, complete the task by clicking on the checkbox, a strikethrough of the task will happen.
* Users can delte the task by clicking on the "x" in the red circle.
* Users can click the 'Not Done' button on the Dailies bar to complete the Dailies and earn coins.
* Users can click on "Archive Done Tasks" to clear the Dashboard of completed tasks.

Clicking on the "+" will bring up the task creation display.
![screenshot](https://i.imgur.com/HpSwsif.png)


Users can buy plants from the florist. If they do not have sufficient coins, they will not be able to purchase the plant. Plants will automatically appear in the inventory automatically, the inventory is in the Garden.
![screenshot](https://i.imgur.com/xRA61h5.png)



### Wireframes

![screenshot](https://imgur.com/HhUNxeC.png)

Wireframes were developed on Figma  
Link: https://www.figma.com/proto/k2KVINSObww30BnGk1XcRN/Project-3?node-id=1%3A2&scaling=min-zoom

### Challenges Faced

## How-To-Use

### Login


### Dashboard

![Image of Dashbord](https://git.generalassemb.ly/zhiyang/taskgarden-front/blob/master/src/assets/img/dashboard-w-instructions.png)

1a. Every day, dailies will be generated for your to accomplish. 

1b. Click on the "Not Done" Button to turn it to done, and earn coins!

2. Press this Button to open the "Add new task button"

3. New Tasks will turn up depending on which classfication you selected on the "Add new task button"

4. Click on the check box to mark the start as done! Uncheck, in case you checked it wrongly

5. Click on the red x Button to delete the task (Note: these are cleared permanently)

6. Once you are calling it a day, press the Archive Done Tasks to archive all tasks you have marked as Done


### Florist


### Garden

## Acknowledgments

#### Habitica, © 2021. All rights reserved.
Gave us the inspiration for the project.

#### Forest, Copyright © 2021. All rights reserved. By SeekrTech
For the alternative idea of growing a garden instead of an overwhelming battle royale game.

#### Kai Ming, Zhi Yang & Yong Jian
The awesome team that brought you this amazing app.
