/* ***************************************************************
 *
 *  File Name : ex2.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-02-2017
 *  Last Modified : Mon Oct  2 21:36:04 2017
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

var url = "https://www.indeed.com/viewjob?jk=da2f29f834d980bf&q=Junior+Developer&l=New+York%2C+NY&tk=1brfu3s4r5udb93f&from=web&advn=9804514590789297&sjdu=FbfXBYAE4AvcdKxFdt61VDiE5A7fyU53g0dd2bikuVMGrV4nbsRdxn0TsJ0zchJiSvIacdUIiLOa1G-pFm_WB6MkWgwni9uD_L8sxebcCo5Ez8c40C8i6w3z1_TOWlPRu07FuSnAEnvc3EOYqiuJC0G6GIdQu4M1N7l7ENi9sgw&acatk=1brfu55kv5mhc9pu&pub=4a1b367933fd867b19b072952f68dceb";
request(url, function(err, resp, body){
  var $ = cheerio.load(body);

  var companyName = $('.company');
  var companyNameText = companyName.text();
  var i = 0;
  var n = companyNameText.length;
  console.log(n);
  while(i < n){
    if(companyNameText[i] == 'I'){
      if(companyNameText[i+1] == 'n'){
        if(companyNameText[i+2] == 'c'){
          companyNameText = companyNameText.substr(0, i+3);
        }
      }
    }
    i++;
  }
console.log(i);
  var jobTitle = $('.jobtitle font');
  var jobTitleText = jobTitle.text();

  var location = $('.location');
  var locationText = location.text();
  i = 0;
  while(locationText[i] != ','){
    i++;
  }
  locationText = locationText.substr(0, i+4);

  var summary = $('#job_summary');
  var summaryText = summary.text();

  var job ={
    companyName: companyNameText,
    jobTitle: jobTitleText,
    location: locationText,
    summary: summaryText
  }

  // $('.company').filter(function(){
  //   var companyName = $(this);
  //   companyNameText = companyName.text();
  // });

  console.log(job);
})

 app.listen(port);
 console.log("Server is listening on " + port);
