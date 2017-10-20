/* ***************************************************************
 *
 *  File Name : scraper.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-03-2017
 *  Last Modified : Tue Oct  3 09:11:48 2017
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
 var team = require('./team');
// const request = require('request');
// const cheerio = require('cheerio');
// const team = require('./team');
// var express = require('express');
// var path = require('path');
// var fs = require('fs');
// var app = express();
// var port = 8080;

//Callback
exports.imgScrapeCB = (url,cb) => {
  request(url,(error,resp,body)=>{
    if(error){
      cb({
        err: err
      });
    }
    let $ = cheerio.load(body);
    let $url = url;
    let $img = $('.post-image img').attr('src');
    let $title = $('.post-title').text();
  let image = {
    url: $url,
    img: "http:"+$img,
    title: $title
  }
  console.log("Scarped from scraper.js", image);
  cb(image);
  });
}

//Promise
exports.ScrapePromiseTables = (url, target) => {
  return new Promise((resolve, reject) =>{
    request(url,(error,resp,body)=>{
      if(error){
        reject(error);
      }
      var $ = cheerio.load(body);
      var $url = url;
      // let tables = $('#my-teams-table').html();
      let tables = $(target).html();
      // console.log(tables);
      resolve(tables);
      });
    })
  }
      // var divs = [];
      // var east = [];
      // var divNBA = $('tbody .stathead td').each(function(i, element){
      //   var node = $(this);
      //   var text = node.text();
      //   divs.push(text);
      //   if(text == "NBA - Eastern Conference - Winner"){
      //     var hold = $('tbody .oddrow td').each(function(i, element){
      //       node = $(this);
      //       var text = node.text();
      //       east.push(text);
      //     });
      //     var hold = $('tbody .evenrow td').each(function(i, element){
      //       node = $(this);
      //       var text = node.text();
      //       east.push(text);
      //     });
      //   }
      // });
      // for (var i = 0; i < divs.length; i++){
      //   console.log("Number "+i+" "+divs[i]);
      //   if (divs[i] == "NBA - Eastern Conference - Winner"){
      //     for(var j = 0; j < east.length; j++){
      //       console.log("Team "+east[j]+" odds "+east[j+1]);
      //       j += 1;
      //     }
      //   }
      // }
      // console.log(divNBA);
      // var divNBAtext = divNBA.text();
      // console.log(divNBAtext);
      // divNBAtext.substr(40,60);
      // $divNBA = $divNBA.toArray();
      // console.log(divNBAtext);
      // var $iteam = $('tbody tr[class=oddrow] td').text();
      // console.log("Team: "+$iteam+"\n");
      // var $iodds = $('tbody td[class=sortcell]').text();
      // console.log($iodds+"\n");
      // let $divisionText = $division.text();
      // let $Team = $('font-bold','.viHeaderNorm').text();//, '.font-bold').text();
      // let $divisionText = $division.text();
      // if ($('.ng-binding ng-scope').text == conference){
      //   console.log("in if\n");
      //   $division = $('ng-binding ng-scope').text;
      //   console.log($division);
      // }
      // console.log($divNBA);
      // console.log(body);
      // let $title = $('.post-title').text();
    // let team = {
    //   team: $Team
    // }
    // console.log("Scarped from scraper.js", image);
