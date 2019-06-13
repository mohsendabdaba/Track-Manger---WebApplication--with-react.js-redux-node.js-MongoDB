const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true,
    
  },
  status: {
    type: String,
    required: true
  }

 
});

module.exports =  Project = mongoose.model('project', ProjectSchema);