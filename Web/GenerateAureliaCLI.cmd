(npm list --depth 0 --global aurelia-cli | findstr aurelia-cli@1.0.0-beta.14 && (echo found)) || (call npm install aurelia-cli@latest -g)
cd Hahn.ApplicatonProcess.May2020.Web
au new ClientApp --unattended --select webpack,http1,typescript,htmlmin-max,none,none,none,none,vscode,no
del ..\GenerateAureliaCLI*