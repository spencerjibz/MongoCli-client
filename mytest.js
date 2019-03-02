// mongoCli test creation template
let {promisify} = require('util')
const {log} = console
 let exec=  promisify(require('child_process').exec)
 // 
  async function some(cmd){
 	let {stdout,stderr} = await exec(`mongoCli ${cmd}`)
   if(stderr) {return stderr}
 	return stdout
   	
 } 
 module.exports = some
 let col = 'users'

