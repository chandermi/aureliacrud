# Aurelia-Crud

API methods information can be found with Swagger URL
https://localhost:44357//Swagger

 
Please restore the nuget with dotnet restore for every project.Web project has folder with name  ClientAPP where we need to run NPM Install
Client app can be statarted with au run but I will recommened to run from visual studio  

The Clientapp build command is au build --env --prod (it requires aurelia-cli)


#Aurelia runs on 8080 port which sometime do not close by itself

So we need to kill the port everytime we run the project

netstat -ano|findstr "PID :8080"

@echo off

set /p id="Enter ID: "

taskkill /pid %id% /f

@echo off

set /p id="Press any key to cancel"


# Note 
It will not work with CICD because we need to setup aurelia cli there
If we directly publish from visual studio it will create a build which is executable on Kestrel Host 

