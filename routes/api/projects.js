const express = require('express');
const router = express.Router();


const Project = require('../../models/Project');


// route   GET api/Projects

router.get('/', (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then(projects => res.json(projects));
});

// route   POST api/Project

router.post('/', (req, res) => {

  const newProject = new Project({
    name: req.body.name,
    deadline: req.body.deadline,
    status:req.body.status,
    
  });
  newProject.save()
  .then(project => res.json(project));
  
});

// route   DELETE api/Project/:id

router.delete('/:id',(req, res) => {
  Project.findById(req.params.id)
    .then(project => project.remove()
    .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


// route   Update api/Project/:id

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Project.findByIdAndUpdate(id, req.body, {
          new: true
      },
      function(err, model) {
          if (!err) {
              res.status(201).json({
                  data: model
              });
          } else {
              res.status(500).json({
                  message: "not found any relative data"
              })
          }
      });
})


module.exports = router;
