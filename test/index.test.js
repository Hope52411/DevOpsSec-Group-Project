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

});
