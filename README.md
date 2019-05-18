## MongoCli-client
 A simple command-line client for mongodb built on top of mongoose and the native mongodb-driver.It was designed to simplify usage of mongodb and its tools(shell). Once installed global. No need for a GUI client.
 
 ### Requirements for usage
 - Nodejs  (v4 and higher) installed
 - Mongodb (local)
 ### Installation
 Before you install, ensure you nodejs v4.xx and higher.Command-line tool is available on the npm registry.<br>
 
 ``` npm install mongocli-client -g ```
 
 ### Features
 - All CRUD(Create,Read,Update and Delete) operations with Mongodb 
 - Connection and management of the remote database via the remote command below
### Usage
![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/general.gif)

### key Facts on Usage
**Note**: For all the CRUD commands to work, ensure mongodb is running on the computer<Br>
1.**Start Command**: <br> 
 For windows users, you should know the path to the mongo-bin directory. You'll be prompted to insert it Its better if you installed mongodb manually.<br>
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/startCommand.gif)
2.**Remote Command**: <br>
 This command was designed to connect to a remote database or the local mongo shell. you'll be prompted to insert connection string.
 if no connection is inserted, the App connects you to the mongoShell. Note: windows users  must insert the mongo-bin path when prompted for this command to work. The command is illustrated in gif below.<br>
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/remoteCommand.gif)
3.**CRUD operation illustration**<br>
 These operations illustrated below are only possible if mongodb service is running.
 ![](https://github.com/spencerjibz/mongoCli-client/blob/master/assets/Crd.gif)
 Enjoy the rest of the features
### Testing
 Ensure that mongodb is running before running the command below.<br>
 ``` npm test ```

### License
  [MIT](https://github.com/spencerjibz/mongoCli-client/blob/master/LICENSE)
