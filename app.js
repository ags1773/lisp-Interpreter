var express = require('express'),
    app     = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res){
  res.render('home');
});

app.listen(3000, function(){
  console.log("Server started.. Browse app on localhost:3000");
});
