var express = require('express'); 
var router = express.Router(); //create a new express routert

let tasks = [];// empty array that will be used to store the tasks

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: "Task Management", tasks }); // Render the index view
});

// createa new task
router.post('/tasks', function(req, res) {
  const { title } = req.body;//req.body is the data sent by the form
  const newTask = { id: Date.now(), title, done: false }; // create a new task object 
  tasks.push(newTask);// add the new task to the tasks array
  res.redirect('/'); //refresh the page
});

// Update a task ( done button or edit title)
router.post('/tasks/:id/update', function(req, res) {
  const { id } = req.params;// get the task id from the URL
  const { title, done } = req.body;// get the new title and done status from the form
  let task = null;
  for (let i = 0; i < tasks.length; i++) {// loop through the tasks array to find the task with the id
    if (tasks[i].id == id) {
      task = tasks[i];
      break;
    }
  }
  if (task) {//if  the task exists
    if (title) task.title = title;// if title is not empty update the task title
    if (done) task.done = done === 'true';//if done is not empty update the task done status
  }
  res.redirect('/');
});

// Delete a task function
router.post('/tasks/:id/delete', function(req, res) {
  const { id } = req.params; // get the task id from the URL and assign it in the id variable

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1); //removes 1 item from the task index i
      break; // stops looping after deleting one task 
    }
  }
  res.redirect('/');// reload the page after deleting the task
});


module.exports = router;
module.exports.tasks = tasks; //export the tasks array to be used in the test file