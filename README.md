# Aurelia-Crud

API methods information can be found with Swagger URL
https://localhost:44357//Swagger

 
Please restore the nuget with dotnet restore for every project.Web project has folder with name  ClientAPP where we need to run NPM Install
Client app can be statarted with au run but I will recommened to run from visual studio  

The Clientapp build command is au build --env --prod (it requires aurelia-cli)

 
#Please change the connection string as per you folder structure in Data/Context/hahnDbConnext.cs
#.mdf file is in Data/Context/hahnDb.mdf

#Aurelia runs on 8080 port which sometime donot close by itself

So we need to kill the port everytime we run the project

netstat -ano|findstr "PID :8080"

@echo off

set /p id="Enter ID: "

taskkill /pid %id% /f

@echo off

set /p id="Press any key to cancel"


# Note 
It will not work with CICD because we need to setup aurelia cli there
If we directly publish from visual studio it will create a build which can be run executable on Kestrel Host 
I have tested it on azure service working fine
