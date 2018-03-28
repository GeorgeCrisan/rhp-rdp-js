
let express = require('express');
let morgan = require('morgan');
let path = require('path');
let sass = require('node-sass-middleware');
let app = express();

app.set('trust proxy', true);

app.use(
    sass({
      src: './',
      dest:  './',
      indentedSyntax: true,
    
      debug: false
   })
  );

app.use(express.static(path.join(__dirname,'views')));

app.get('/favicon.ico',(req,res)=>{
    res.send('404');

});



app.get('/whoami',(req,res)=>{
          /*var ip = req.headers['x-forwarded-for'].toString() || req.connection.remoteAddress;
           ip =  ip.split(',::ffff:');
           */
          let languageClient =  req.acceptsLanguages()[0];
           let ipClient = req.ip;
           let userAgent = req.headers['user-agent'].slice(13,39);
           console.log(userAgent);
  
           let dataObj = {
              ipaddress: ipClient,
              language: languageClient,
              software: userAgent
           }
           
  
  
          
   res.send(JSON.stringify(dataObj));

});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
