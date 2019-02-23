let {spawn} = require('child_process')
const {log} = console
const Path = require('path')
//  function that run the  cmd /bash/terminal command and binaries with all stdin(interactive)
 exports.Run =  function (cmd,args,dir,cb){
     let eve = spawn(cmd,args, {
         cwd: dir,
         stdio:'inherit',
         stderr:'inherit'
     })
     eve.on('error',data=>cb(data.toString()))
     cb(eve.stderr,eve.stdout,eve.stdin)
 }
 