const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const passport = require('passport');

const projects = require('./routes/api/projects');
const tasks = require('./routes/api/tasks');
const members=require('./routes/api/members')
const users = require('./routes/api/users');


const app = express();


mongoose.set('useFindAndModify', false);


app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

var mongoDB = 'mongodb://127.0.0.1/WorkProject';

mongoose
  .connect(mongoDB,{ 
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  mongoose.Promise = global.Promise;


  // Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


//  Use Routes
app.use('/api/projects',projects);
app.use('/api/tasks',tasks);
app.use('/api/members',members);
app.use('/api/users',users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(5000, () => console.log('Server started on port 5000'));
