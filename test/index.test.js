const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app');

describe('Task Management Routes', () => {

  // Test the GET response
  it('should return the home page with status 200', (done) => {
    request(app) // start the request to the app.js file  
      .get('/')// send a get request to the home page
      .expect(200, done); // expect a 200 status code
  });


  it('should create a new task and redirect', (done) => {// Test POST response creating a new task
    request(app)//
      .post('/tasks')// send a post request to the /tasks route
      .send({ title: 'Testing Task' })//
      .expect(302) // redirects to '/' (in other words refrehes the page)
      .end((err, res) => {// check if the task went to the array
        if (err) return done(err);// return an error if the task did not go through
        done();
      });
  });
  // Test POST /tasks/:id/update
  it('should update a task title', (done) => {
    // First we create a task
    request(app) 
      .post('/tasks')
      .send({ title: 'Task to Update' })
      .end((err, res) => {
        if (err) return done(err);

        
        const tasksRoute = require('../routes/index');// Get the ID of the task we just created
        const tasks = tasksRoute.tasks || []; // Get the tasks array
        const taskId = tasks[tasks.length - 1].id;// Get the ID of the last task in the array

        
        request(app) // now we update the task
          .post(`/tasks/${taskId}/update`) // send a post request to the /tasks/:id/update route
          .send({ title: 'this task was updated' })  // send the new title in
          .expect(302) // expect a 302 response code
          .end((err, res) => {// check if the task was updated
            if (err) return done(err);
            done();
          });
      });
  });
  it('should delete a task', (done) => {//same as the update task but this time we delete the task
    // create the task to delete first
    request(app)
      .post('/tasks')
      .send({ title: 'Task to Delete' })
      .end((err, res) => {
        if (err) return done(err);

        // Get the ID of the task we just created
        const tasksRoute = require('../routes/index');
        const tasks = tasksRoute.tasks || [];
        const taskId = tasks[tasks.length - 1].id;

        // Delete it
        request(app)
          .post(`/tasks/${taskId}/delete`)
          .expect(302) // expect a 302 response, if error return the error
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
  });

});
