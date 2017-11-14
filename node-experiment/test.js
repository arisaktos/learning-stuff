var filesYo = require('fs'); //to access file system
var https = require('https');

//__dirname means the directory you are in
filesYo.writeFile(__dirname +"/index.html","<h1>html rocks</h1>");

var dogUrl = "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg";
var dogFile = filesYo.createWriteStream(__dirname+"/mycat.jpg");
var request = https.get(dogUrl,function(response){
    response.pipe(dogFile);
});
