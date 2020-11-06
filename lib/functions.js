let {promisify} = require('util')
 let exec=  promisify(require('child_process').exec)
 // 
  async function some(cmd){
 	let {stdout,stderr} = await exec(` node ./bin/app.js ${cmd}`)
   if(stderr) {return stderr}
 	return stdout
   	
 } 
 module.exports = some
some('cols myusers').then(v=>console.log(v))