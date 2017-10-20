/* ***************************************************************
 *
 *  File Name : pinterest.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-03-2017
 *  Last Modified : Tue Oct  3 08:29:30 2017
 *  Description :
 *
 * *************************************************************** */

 var express = require('express');
 var path = require('path');
 var request = require('request');
 var cheerio = require('cheerio');
 var fs = require('fs');
 var app = express();
 var port = 8080;

 var url = "https://www.pinterest.com/pin/16395986122172500/";
 var pin = {};

request(url, function(err, resp, body){
  var $ = cheerio.load(body);

  var $img = $("meta[property='og:image']").attr('content');
  var $desc = $("meta[property='og:description']").attr('content');
  var pin = {
    img: $img,
    desc: $desc,
    url: url,
  }
  console.log("Scraped ",pin);
});

 app.listen(port);
 console.log("Server is listening on " + port);
