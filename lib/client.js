/* trial to develop app as a dependency but I came to release it was point since the results return 
a string with multiple characters included white spaces and new lines. This is unnecessary  to formate it with  
regular expressions since the App logs strings instead of returning the them.
*/
let {Run} = require('./programrunner')
let {callbackify} = require('util')
let {log} = console
let func = require('./functions')
let client = (cmd,cb)=>{
let sipComs = /^(start|s)|^( find|f)|^(del|-d)|^( remote|^re)|^(add)|^( update|up)/g

if( typeof cmd!=='string'){
    cb(new Error(`The command(first parameter) must be passed as string,${typeof cmd}`))
}
else if(sipComs.test(cmd)) {

  let command = cmd.match(sipComs)
  let args = [cmd.replace(sipComs, '')]
  log(command, args)
  Run('node',[...command,...args], process.cwd(), cb)



}
else {
 func(cmd)
}
     
        


}
client('',(err,stderr,data)=>err?console.log(err):console.log(data))