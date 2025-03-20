# Task Managment Application

This application was created by the NCI students of Bachelor of Science (Honours) in Computing Information for the DevOpsSec Module to showcase the student's ability to collaborate together in a CI/CD pipeline making changes in code, commit, test, and deploy without failing the pipeline or debugging when it does so. The program is a Task Manager Web Application that handles CRUD operation by taking a task to be completed, input from the user and listing them on the screen, once the task is created the user can edit the task name, mark it as done or delete it. The application is hosted by AWS EC2 with SSH encryption. 

***
# Developers:

Xiangze(James) Xue
ID 23361123

Aloisio(Ali) Pereira Junior 
ID 21211027

# Project Technologies:

Node.js, JavaScript,HTML, Mocha+Chai, CircleCI CI/CD Pipeline, AWS EC2, Docker

# Initiating Project
1. Use the cd command to navigate to the downloaded projects directory
2. Run to install dependencies: 
```bash
npm install
npx mocha --reporter mocha-circleci-reporter test/*.js # for testing
```
3. Add "privatekey.pem" and "server.crt" files to the project directory 
4. Run to start the npm local server:
```bash
npm start
```


***
