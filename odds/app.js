/* ***************************************************************
 *
 *  File Name : app.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-03-2017
 *  Last Modified : Tue Oct  3 09:11:33 2017
 *  Description :
 *
 * *************************************************************** */

const scraper = require('./scraper');
const team = require('./team');
const fs = require('fs');
const path = 'odds.html';
const url = "http://www.espn.com/nba/lines/_/type/futures";
// const url = "https://www.indeed.com/viewjob?jk=da2f29f834d980bf&q=Junior+Developer&l=New+York%2C+NY&tk=1brfu3s4r5udb93f&from=web&advn=9804514590789297&sjdu=FbfXBYAE4AvcdKxFdt61VDiE5A7fyU53g0dd2bikuVMGrV4nbsRdxn0TsJ0zchJiSvIacdUIiLOa1G-pFm_WB6MkWgwni9uD_L8sxebcCo5Ez8c40C8i6w3z1_TOWlPRu07FuSnAEnvc3EOYqiuJC0G6GIdQu4M1N7l7ENi9sgw&acatk=1brfu55kv5mhc9pu&pub=4a1b367933fd867b19b072952f68dceb";
// var conference = "2018 Central Division - Odds to win";
//Callback Example
// scraper.imgScrape(url,(data)=>{
//   console.log("Data from scraper recieved");
//   console.log(data);
// });

// Promise Example
scraper.imgScrapePromise(url)
.then((data) =>{
  console.log("data from scraper recieved");
  fs.writeFile(path,JSON.stringify(data),(error)=>{
    if (error){
      console.log(error);
    }
    console.log("Successfully wrote to "+path);
  })
})
.catch((error)=>{
  console.log("Error scraping data");
})
