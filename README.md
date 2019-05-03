## MongoCli-client
 A simple command-line client for mongodb built on top of mongoose and the native mongodb-driver.
 
 ### Requirements for usage
 - Nodejs  (v6 and higher) installed
 - Mongodb (local)
 - git
 ### Installation
 1. Clone repo / download the zip
    Run ``` git clone https://github.com/spencerjibz/mongoCli-client,git ```
 ### Features
 - All CRUD operations with Mongodb 
 - Connection and management of the remote database via the remote command below
### USAGE
```
Options:
  -h, --help                         output usage information

Commands:
  start|s                            starts the mongo service for windows platform or checks for service on linux and MacOs
  kill|k                             stops the mongodb service
  list|ls                            lists the databases available for usage
  documents|docs [options] <dbname>  returns all the documents in specific collection of the defined  database
  find|f [options] <dbname>          finds the specific document from the name database
  list-collection|cols <dbname>      list all the collections in the preferred database
  del|-d [options] <dbname>          deletes specified document from the database
  remote|re                          connects to a remote database ie mlab or mongoaltas or local mongo shell
  eval|ev [options] <cmd>            run mongo shell commmand parsed as arguements
  delcol|rmc [options] <cmd>         deletes the named collection
  mkCol|ccol [options] <cmd>         create collection
  delAll|dAll [options] <dbname>     deletes all the documents in the specific collection
  add [options] <dbname>             add documents or an array of documents into the collection
  dropDb <dbname>                     drops the specified database
  stats <dbname>                     returns of the statistics of the named database
  mkDb <dbname>                      creates  the specified database

```
