let  {Db} = require('mongodb')
let dbClient = require('mongodb').MongoClient;
let {Server} = require('mongodb')
const {log} = console
const util = require('util')
let assert = require('assert')
const inquirer = require('inquirer')
const url = 'mongodb://localhost:27017'
const mongoose = require('mongoose')
const colors = require('colors')
 const {promisify} = require('util')
     const {Run} = require('./programrunner')
     lswin = require('os').platform().includes('win') ==true
    
exports.list = function(){
// connection string (using inquirer for this )
// db name from the inquirer 


// connection with client 
dbClient.connect(url,(err,client)=>{
    if(!err) {const adminDb = client.admin()



   // list  the available databases
   
  adminDb.listDatabases((err,dbs)=>{
       err? log(err): 
       
       log('YOUR DATABASES')
       log('------------------------------')
       dbs.databases.forEach(e=>{log(e.name.blue)}) 
       
       
       client.close()
       process.exit() 
       
   })}
   else {
       log('no mongodb service available'.red.bold)
   }
})


}

exports.findAll = function(db,col){
   // fetch the database list and use with the inquirer module
  
  //  establish connections
  dbClient.connect(`${url}/${db}`,function(err,db){
      err? log(`Connection failed or not mongo service is running if its not the case, check your dbname and collection name`.yellow.bold):
 
 db.collection(col,function(err,collection){
collection.find().toArray(function(err,docs){
    if(err) throw err
    else {
        if(docs.length>0){
     log('DOCUMENTS AVAILABLE'.cyan)
     log('------------------------------------------------------------------------')
     docs.forEach(e=>log(colors.bold.green(e)))
     
     db.close()
     process.exit()
        }
   
log('There are no documents available')
db.close()
process.exit()
} 
})
})
 })
}
// function query for specific doc
exports.findOnly = function(db,col,filter){
 mongoose.connect(`${url}/${db}`,{useNewUrlParser:true},(err,db)=>{
if(err) {
    log(colors.red(`Ensure mongodb in running, if that's not the case, check ur dbname and other parameters`))
    process.exit()
}
db.collection(col).findOne(filter,(err,docs)=>{
    if(err||docs==null){
        log('This is no such document in the database'.red)
        process.exit()
    }
    else {
        const {values} = Object  
        log('MATCHES IN THE DATABASE'.cyan)
             log('-------------------------')
         log(colors.blue(docs))
         process.exit()
          db.close()
    } 
})

 })
}
// show collections in the database
exports.cols = function(dbname){
    // connected to the 
    dbClient.connect(`${url}/${dbname}`, (err, db) => {
     // err handling
     if(err ) {
         log(`Connection to database failed, try running mongoCli start  for windows platform`.bgRed)
         process.exit()
     }
 db.eval('db.getCollectionNames()',(err,cols)=>{
    if( cols==null) {
        log('there are no collections in preferred database'.bgMagenta)
        db.close()
            
    }
     else if(err) {
        log(err)
    }
    else {
        log('AVAILABLE COLLECTIONS INCLUDE:'.cyan)
        log('------------------------------')
        cols.forEach(e=>log(colors.bold.blue(e)))
        db.close()
    }
})



    })
}
// function that delete the specific document
exports.deleteOne = (dbname,col,filter)=>{

    //  connect to the preferred database ho
    mongoose.connect(`${url}/${dbname}`,{useNewUrlParser:true},(err,db)=>{
        if(err) {
            log(`connection failed, ensure mongodb is running if its true then try again with correct parameters`.red)
            process.exit()
        }
        db.collection(col).findOneAndDelete(filter,function(err,done){
            if(err) {
                log('deletion failed')
                db.close()
            }
            else {
                log(' specfied document has been successfully deleted'.bold.underline.green)
                db.close()
            }
        })
    })
}
// function that update a specific document
exports.UpdateOne = (dbname,col,filter,info)=>{
mongoose.connect(`${url}/${dbname}`,{useNewUrlParser:true},(err,db)=>{
    if(err){
         log(`connection failed, ensure mongodb is running if its true then try again with correct parameters`.red)
         process.exit()
    }
else {
    let exp = /[a-z]+:/g,arr = info.match(exp) ,Prop = arr.toString().replace(/:/g,'');
    let ex = /:\D[a-zA-z0-9]+\D/g, valA = info.match(ex),Val=valA.toString().replace(/\W/g,'');
    let updator = {[Prop]:Val}

   log(updator)
db.collection(col).findOneAndUpdate(filter,{$set:updator},(err,done)=>{

    if (err) {
        log('update failed'.red.bold,err)
        process.exit
        db.close()
    } else {
        log(' specfied document has been successfully updated'.bold.underline.green)
        db.close()
    }


})


}

})


}

exports.remote= (url,Shellpath)=>{
// function to a remote  mongo instance 

Run('mongo',[`${url}`],Shellpath,(err,db,stderr)=>{
    if(err) {
        log(colors.bgRed('Connection to remote database failed','check the url and try again'))
    }
    else {
        log('connection successfull'.blue)
        log('---------------------------------------------------------------------------')
    
        
    }
})

}
//  function that parse command to directly to mongo shell 
exports.eval = function(dbname,cmd){
    // 
    dbClient.connect(`${url}/${dbname}`,(err,client)=>{

 if(err) {
     log(`connection failed, check if mongo is running`.bgRed)
 }
 else {
     client.eval(cmd,(err,info)=>{
         if(err) {
             log('unknown mongo shell command'.bold.cyan)
             client.close()
         }
         else{
        
         log('command was successfully executed'.magenta)
         log(colors.blue(info))
         client.close()
         }
     })
 }

    })
    
}

// create collection 
exports.createCol = function(dbname,colname) {
dbClient.connect(`${url}`,(err,client)=>{
    err? log(`connection failed`.red.bold):
 client.db(dbname).createCollection(colname,(err,done)=>{
     err? log('failed to create collection. try again'.red):

      log('collection created successfully')
      exports.cols(dbname)
      client.close()
 })

})


}
// delete a collections created
exports.delCol = (dbname,colname)=>{
    dbClient.connect(`${url}`,(err,client)=>{
        err? log('connection failed'.red):
        client.db(dbname).collection(colname).drop((err,done)=>{
            if(err) { log('failed to delete the named collection'.bgRed);client.close()}
            else {
            log(`collection was successfully deleted`.blue)
            exports.cols(dbname)
            client.close()
                }        })
    })
}
// delete all documents in a  collections
exports.deleteAll = function(dbname,col){
     mongoose.set({
         UseCreateIndexes: true
     })
    mongoose.connect(`${url}/${dbname}`,{useNewUrlParser:true},(err,client)=>{
        err? log('connection failed'.red)
        :
        client.collection(col).deleteMany({},(err,done)=>{
            err? log('failed to delete all document in named collection'):
            log('successfully deleted all documents'.green)
            exports.findAll(dbname,col)
            client.close()
        })
    })
}
// function  to insert a document in specific collection
exports.insert= function(dbname,col,obj){
dbClient.connect(`${url}/${dbname}`,(err,client)=>{
    
    err? log('connection failed'.bgRed):
  
    client.eval(`db.getCollection('${col}').insert(${obj})`,(err,done)=>{
       if(err) {
           log('failed to insert the document specified')
           client.close()
        }
    else {
       log('document inserted successfully'.bgBlue)
  
       exports.findAll(dbname,col)
       client.close()
      
    }
})
})

}
// function that create a name database
exports.createDb = (dbname)=> {
    // connect to the test db
    dbClient.connect(`${url}/${dbname}`,(err,db)=>{
        err? log(colors.bgRed('connection to mongodb service failed','down check if the mongo service is running'))
        :
        db.eval(`db.getSiblingDB('${dbname}').createCollection('test')`,(err,done)=>{
            err? log(`failed to create ur named database`.red):
            
            log('database successfully created')
          
         

         exports.list()
           db.close()
        })
    })
}
// function that drops the named database
exports.delDb= (dbname)=>{
// connect to the named database
dbClient.connect(`${url}/${dbname}`,(err,db)=>{
    err? log('connection failed'.red)
    :
    db.dropDatabase((err,done)=>{
 err? log('failed to drop specified database'.red.bold):
 log('database dropped successfully'.blue)
 exports.list()

 
    })
    

})


}
//function that shows the stats of a database
exports.stats = (dbname)=>{
    dbClient.connect(`${url}/${dbname}`,(err,db)=>{
        err? log('connection failed'.red)
        : 
        db.stats((err,done)=>{
            err? log('operation failed'.red):
            log('DATABASE STATS'.bold.blue)
            log('---------------------------------------------------')
            log(colors.green(done))
            db.close()
        })
    })
}
