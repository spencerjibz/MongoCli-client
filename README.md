## MongoCli-client
 A simple command-line client for mongodb built on top of mongoose and the native mongodb-driver.It was designed to simplify usage of mongodb and its tools(shell). Once installed global. No need for a GUI client.
 
 ### Requirements for usage
 - Nodejs  (v6 and higher) installed
 - Mongodb (local)
 - Git
 - Terminal, bash, cmd or powershell
 ### Installation
 **Note**: App shall be added soon to npm but for the meanwhile, follow the steps below <br>
 1. Clone repo / download the zip <br>
 Run ``` git clone https://github.com/spencerjibz/mongoCli-client.git ```
 2. Install the project dependancies <br>
 Run ``` cd  mongoCli-client && npm install  ```
 3. Install the App globally and check out all its functionality <br> 
 Run ``` npm install  -g ./  && mongoCli  ``` 
 
 ### Features
 - All CRD(Create,Read and Delete) operations with Mongodb 
 - Connection and management of the remote database via the remote command below
### Usage
![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/general.gif)

### key Facts on Usage
**Note**: For all the CRD commands to work, ensure mongodb is running on the computer<Br>
1.**Start Command**: <br> 
 For windows users, you should know the path to the mongo-bin directory. You'll be prompted into insert Its better if you installed mongodb manually.<br>
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/startCommand.gif)
2.**Remote Command**: <br>
 This command was designed to connect to a remote database or the local mongo shell. you'll be prompted to insert connection string.
 if no connection is inserted, the App connects you to the mongoShell. Note: windows users  must insert the mongo-bin path when prompted for this command to work. The command is illustrated in gif below.<br>
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/remoteCommand.gif)
3.**CRD operation illustration**<br>
 These operations illustrated below are only possible if mongodb service is running.
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/Crd.gif)
 Enjoy the rest of the features
### Testing
 To test if the app passes all tests ensure that mongodb is running then run the command.<br>
 ```  npm test ```
 
### License
  MIT
