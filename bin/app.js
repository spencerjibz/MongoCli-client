#!/usr/bin/env node
const program = require('commander')
const db = require('../lib/db')
const colors = require('colors')
const {list,findAll,findOnly,deleteOne,remote,delCol,createCol,eval,deleteAll,insert,stats,createDb,delDb} = require('../lib/db-client')
const {cols} = require('../lib/db-client')
const {start,kill} = db
const {log} = console
const {exec} = require('child_process')
const inquirer = require('inquirer')
const os = require('os')
let ErrorHandler = require('all-error-handler')
// error handler 
new ErrorHandler(v=>{
    log(colors.red.bold(`command execution failed, check your parameters(arguments)`))
    process.exit()
})
// alternative logic for darwin platform 
let ForDarwin = () => {


    exec('nc -zvv localhost 27017', (err, done, stderr) => {

        err ? log(`no mongod service running`.bgYellow.bold) :
            log('database running at localhost:27017'.cyan.bold)
        log(colors.blue(done))
    })
}
exports.startDarwin = ForDarwin

// program that starts by database
// mymongo start
program
.command('start')// the main  sub-command name
.alias('s')// alternative sub -command name
.description(' starts the mongo service for windows platform or checks if the service is  running on other platforms')
.action(function(){
  !os.platform().includes('darwin')? start():
  ForDarwin()
   
    
})
// program that kills the mongo service
// myapp kill |k 
program
.command('kill')
.alias('k')
.description('stops the mongodb service')
.action(function(){
kill()
}
    
)
// program that lists all the above databases
// myapp ls 
// myapp list
program
.command('list')// the main sub-command name
.description('lists the databases available for usage')
.alias('ls')
.action(function(){
    list()

})
// program that shows documents in a defined collection
// myapp docs
program
.command('documents <dbname>')
.alias('docs')
.option("-c,--collection [value]",'the collection name')
.description('returns all the documents in specific collection of the defined  database')
.action((cmd,options)=>{

    
    findAll(cmd,options.collection)
}
)
// program that finds a specific document using query 
program
.command('find <dbname>')
.alias('f')
.description('finds the specific document from the name database')
.option("-c,--collection [value]",'the preferred collection')
.action((cmd,options)=>{
    
    let qns = [ 
        {type:'input',name:'q_type',message:'find by?'},
        {type:'input',name:'q_obj',message:'q_name'}
    ];
inquirer.prompt(qns).then(ans=>{
    const {q_type,q_obj} = ans
    let filter = {[q_type]:q_obj}
findOnly(cmd,options.collection,filter)


})})
// rogramm that fetches all available collections
program
.command('list-collection <dbname> ')
.alias('cols')
.description('list all the collections in the preferred database')
.action((cmd)=>{
    
 cols(cmd)

})
// program that deletes a specific document
program 
.command('del <dbname>')
.alias('-d')
.option("-c, --collection [value]",'name of the collection')
.description('deletes specified document from the database')
.action(function(cmd,options){
    inquirer.prompt([{type:'input',name:'q_type',message:'filter by'},{type:'input',name:'q_name',message:'query name:'}])
  .then (ans=>{
      let {q_type,q_name} = ans 
      let filter  = {[q_type]:q_name}
      deleteOne(cmd,options.collection,filter)
  })
})
// myapp  remote <url>
program
.command('remote')
.alias('re')
.description('connects to a remote database ie mlab or mongoaltas or local mongo shell')
.action(function(){
    log(` this command automatically connects to shell of  local database(only if available) when no remote connection is specified`.bgBlue.bold)
    
 inquirer.prompt([{type:'input',name:'shellpath',message:'Enter the path to the mongo shell:',when:os.platform().includes('win')},{type:'input',name:'url',message:'Enter remote database connection string:'}])
.then(ans => {
    
    remote(ans.url, ans.shellpath)
})

})



//create collections
// myapp create document 

//myapp eval [cmd]
program
.command('eval <cmd>')
.alias('ev')
.option("-d,--db [value]",'name of the database')
.description('run mongo shell commmand parsed as arguements')
.action((cmd,options)=>{
    
  eval(options.db,cmd)



    
})

program
.command('delcol <cmd>')
.alias('rmc')
.description('deletes the named collection')
.option("-d, --dbname [value]", 'database name')

.action((cmd,options)=>{
    log(options.dbname)
 delCol(options.dbname,cmd)
})

// myapp mkcol collection name -d dbname
// create name collection 
program
.command('mkCol <cmd>')
.alias('ccol')
.option("-d, --dbname [value]",'database name')
.description('create collection')
.action((cmd,options)=>{

createCol(options.dbname,cmd)
})
program 
// myapp dAll dbname -col collection
// deletes all the document in specific collection
.command('delAll <dbname>')
.alias('dAll')
.description('deletes all the documents in the specific collection')
.option("-c,--collection [value]",'collection name')
.action((cmd,options)=>{
deleteAll(cmd,options.collection)
})
// myapp addto dbname -c users
//
program
.command('add <dbname>')
.description('add documents or an array of documents into the collection')
.option("-c,--collection [value]",'collection name')
.action((cmd,options)=>{
    inquirer.prompt({type:'editor',name:'docs',message:'Enter  and save  an array or object of documents to insert in editor'})
    .then(ans=>{
    
   insert(cmd,options.collection,ans.docs)
 


   
    })
})
// myapp dropDb <dbname>
program
.command('dropDb <dbname>')
.description(' drops the specified database')
.action(cmd=>{
delDb(cmd)
})
// myapp stats <dbname>
program
    .command('stats <dbname>')
    .description('returns of the statistics of the named database')
    .action(cmd => {
   stats(cmd)
    })
    // myapp mkDb <dbname>
    program
        .command('mkDb <dbname>')
        .description('creates  the specified database')
        .action(cmd => {
       createDb(cmd)
        })
// let the program parse the CLI arguments
program.parse(process.argv)
// error handler 

// in case of no args

if(!program.args.length) program.help()

