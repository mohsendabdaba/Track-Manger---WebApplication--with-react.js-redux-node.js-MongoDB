const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    id: {
    type: String,
     required: false
  },
   title: {
    type: String,
    required: true,
    
  },
  status: {
    type: String,
   // required: true
  }
 
});

module.exports =  Task = mongoose.model('task', TaskSchema);