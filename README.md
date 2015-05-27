![lunchcorgi](/client/assets/login.gif)
![login] (http://i.imgur.com/Pzz4syp.jpg)
![home] (http://i.imgur.com/eTKCDVb.jpg)

Contributers
------------

[Kevin Brown](https://github.com/spintronics)

[Jason Collins](https://github.com/SaintEmbers)

[Zach Royer](https://github.com/zroyer)

[Richard Young](https://github.com/youngrichard)


Stack
-----

MongoDB, Express, AngularJS, Node.js, and some additional styling with Materialize

 - NOTE -
The project does not use Mongoose for purposes of ORM.  However there are some methods in the project which do use Mongoose so the references and 'requires' are still in there.

Database
--------

The MongoDB stores Users and Events in collections. Users have an id assigned by Mongo, name, password, and eventIDs from events document. Events have an id assigned by Mongo, a description, a location, a creatorID corresponding to the userID of the event creator, and a list of userIDs of people who have joined the event.

To get started with the database, there must be at least one user and one event.  Start by using the "Sign Up" to add one user then create one or more events.

Unless the project is upgraded to be used with Gulp or Grunt, the Mongo server must be started before the Node.js server is started.  Otherwise, Node.js server will produce 'process.nextTick()' error.

Getting Started
------
Make sure you have MongoDB and Node.js installed. Navigate to the root directory and install all packages:

```
npm install
```

Inside of the server directory, create a `/data/db` path.

From the server directory, start your Mongo database:

```
mongod --dbpath data/db
```

Navigate to your root directory and start your Node.js server:

```
node server/server.js
```

Finally, navigate to `http://localhost:8000` to start creating events!
