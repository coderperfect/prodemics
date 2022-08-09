# Prodemics

An Online School System


## Front end deployment using Github Pages

Instead of going with a separate repo for each front end apps, this repo with different branches for the build artifacts at the root level approach is followed. For instance Angular app branch is <a href="https://github.com/coderperfect/prodemics/tree/ghpage">ghpage</a> with it's own gitignore file for local only files to be ignored.


## Heroku Maven Plugin

The backend-spring app is configured with heroku-maven-plugin for uploading the JAR file directly to Heroku and specifying the command for Heroku to run the JAR file. Reference: <a href="https://devcenter.heroku.com/articles/deploying-java-applications-with-the-heroku-maven-plugin">https://devcenter.heroku.com/articles/deploying-java-applications-with-the-heroku-maven-plugin</a> for details. However this is not a scalable approach as it uploads 70MB+ JAR file everytime. So the Spring backend app in this repo is not maintained anymore. It is now in <a href="https://github.com/coderperfect/prodemics-backend-spring">https://github.com/coderperfect/prodemics-backend-spring</a> for deployment with the code directly to Heroku taking advantage of the Heroku detection of Spring boot app and doing both creation of JAR file and running it by passing the port in the java -jar command which needs to be passed in the JAR deployment heroku-maven-plugin approach.