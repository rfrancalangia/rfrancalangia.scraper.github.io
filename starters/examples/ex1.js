/* ***************************************************************
 *
 *  File Name : ex1.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-02-2017
 *  Last Modified : Mon Oct  2 20:43:37 2017
 *  Description :
 *
 * *************************************************************** */

var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

var url = "http://google.com";
//Example 1
// request(url, function(err, resp, body){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(body);
//   }
// });

//Example 2
// var destination = fs.createWriteStream("./downloads/google.html");
// request(url)
//   .pipe(destination);

// Example 3
var destination = fs.createWriteStream("./downloads/google3.html");
request(url)
  .pipe(destination);
destination.on('finish', function(){
  console.log('all done');
});
  // .on('finish', function(){
  //   console.log("done");
  // })
  // .on('error', function(){
  //   console.log(err);
  // })

app.listen(port);
console.log("Server is listening on " + port);
