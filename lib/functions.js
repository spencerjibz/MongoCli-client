let {promisify} = require('util')
 let exec=  promisify(require('child_process').exec)
 // 
  async function some(cmd){
 	let {stdout,stderr} = await exec(`mongoCli ${cmd}`)
   if(stderr) {return  stderr}
 	console.log(stdout)
   	
 } 
 module.exports = some
some('ls')