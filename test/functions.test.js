let mongoCli= require('../lib/functions')
let insert = require('../lib/db-client')
let {platform} = require('os')
let Iswin = platform().includes('win')
let Islinux = platform().includes('linux')
let IsMac= platform().includes('darwin')
let {promisify} = require('util')
let inserter = promisify(insert.insert)
let generator  = require('randomstring')
let colors = require('colors')
const {log} = console
// test for the platform
let randSt= generator.generate({length:6,charset:'alphabetic'})
/*beforeAll(()=>{
 log(`Before running tests, ensure the database is installed and running`.magenta.bold)

})
*/
describe('MongoCli ',()=>{
   // change the timeout setting
  
    // should list the database available
it(' should list the database available', () => {
    // expected errs are no mongodb service available


    return mongoCli('ls').then(e => expect(e.includes('no mongodb service available')).toEqual(false))
})
// should create collections
it(' create collections  successfully',()=>{
    
    return mongoCli('mkCol materials -d test').then(e => expect(e.includes('materials')).toEqual(true))

})
// should insert a document  database


it('Should insert documents succesfully',()=>{
   
 return mongoCli(`eval "db.getSiblingDB('test').getCollection('materials').insert({book:'${randSt}'})" -d test`).then(e => expect(e.includes('command was successfully executed')).toEqual(true))
})
// should find a document successfully
it('should find a document succesfully',()=>{
return mongoCli(`eval "db.getSiblingDB('test').getCollection('materials').find({book:'${randSt}'})" -d test`).then(e => expect(e.includes('command was successfully executed')).toEqual(true))


})
// it should delete a document successfully
it('should delete a documents successfully',()=>{


return mongoCli(`eval "db.getSiblingDB('test').getCollection('materials').findOneAndDelete({book:'${randSt}'})" -d test`).then(e => expect(e.includes('unknown mongo shell command')).toEqual(false))
})
// it should delete  a collection 
it('should delete a collection',()=>{
  
return mongoCli('delcol materials -d test').then(e => expect(e.includes('materials')).toEqual(false))
})
// it should  create  new database successfully 
it('should create a new database successfully',()=>{
    return mongoCli(`mkDb ${randSt}`).then(e => expect(e.includes(randSt)).toEqual(true))
})
// should delete  databases successfully
it('should delete a database successfully',()=>{
    return mongoCli(`dropDb ${randSt}`).then(e => { return expect(e.includes(randSt)).toEqual(false)})
})
// should connect to remote database successfully

})
