let cmd = require('node-cmd')
const {log} = console
const colors = require('colors')
let os = require('os')
let find = require('find-process')
let Iswin = os.platform().includes('win')==true 
let isMac = os.platform().includes('darwin') ===true;
let isAndroid = os.platform().includes('android')==true 
let isLinux = os.platform().includes('linux')==true
let inquirer = require('inquirer')
 const {exec} = require('child_process')
 const {Run} = require('../lib/programrunner')
 let path = require('path')
 let {chdir} = require('process')
 let fs = require('fs')
// function thats starts my mongo database
 exports.start = function(){
     let qns = [
         {type:'input',name:'dbpath',message:'Enter the  folder where mongo was installed'},
         {
             type: 'input',
             name: 'dbfolder',
             message: 'Enter the path  to the folder with the database files(mongodb/data/bin)'
         }
         
     ]
 Iswin===true?
 
 inquirer.prompt(qns).then(ans=>{
 
 
 
fs.readdir(ans.dbpath,function(err,done){
 if(err){
          log('invalid mongo-bin path'.red.bold)
 }
 else {
     
     Run('mongod', ['--directoryperdb', '--dbpath', '../data/db'],ans.dbpath,(err,data,stdin) => {
         if (err) throw err
         log('database started successfully'.cyan.bold)
       
     })
    }
})}):// logic for the macOs and linux 
isLinux || isMac?

cmd.get('nc -zvv localhost 27017',(err,done,stderr)=>{

    err? log(`no mongod service running`.bgYellow.bold):
    log('database running at localhost:27017'.cyan.bold)
    log(colors.blue(done))
}):
// logic for android 
log(`this operation is not supported in ${os.platform()} platform, other operations are supported then, make sure mongo is running though`.red.bold)

 }
 
 // function that kills the mongodb start
 exports.kill = function(){
     let ps = find('name','mongo').then(ps =>
    ps.forEach(function(v){
        Iswin===true?
         cmd.get(`powershell kill ${v.pid} `,(err,done,stderr)=>{
             !err? log(`${v.name} service has been stopped`.bold.blue):
             log(colors.red(err))
         }):
         cmd.get(`kill ${v.pid}`, (err,done,stderr) => {
             !err ? log(`${v.name} service has been stopped`.bold.blue) : log(colors.red(err))
         })
        })).catch((e)=>{
            log(`there  is no mongo service running`.blue)
        })
 }