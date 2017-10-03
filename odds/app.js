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

//Callback Example
// scraper.imgScrape(url,(data)=>{
//   console.log("Data from scraper recieved");
//   console.log(data);
// });

// Promise Example
scraper.ScrapePromiseTables(url)
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
