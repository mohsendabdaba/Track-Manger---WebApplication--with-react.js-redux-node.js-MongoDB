const express = require('express');
const router = express.Router();


const Task = require('../../models/Task');


// route   GET api/tasks

router.get('/', (req, res) => {
    Task.find()
    .sort({ date: -1 })
    .then(tasks => res.json(tasks));
});

// route   POST api/task

router.post('/', (req, res) => {
  const newTask = new Task({
    id: req.body.id,
    title: req.body.title,
    status:req.body.status,
    
  });
  newTask.save()
  .then(task => res.json(task));
  
});

// route   DELETE api/Project/:id

router.delete('/:id',(req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove()
    .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
    ;
});


// route   getby id  api/Project/:id

router.get('/:id',(req, res) => {
  Task.findById(req.params.id)
     .then(tasks => res.json(tasks));
});


// route   Update api/Project/:id

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Task.findByIdAndUpdate(id, req.body, {
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
