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
const fs = require('fs');
const path = 'text.txt';
const url = "https://imgur.com/gallery/pJ96E";

//Callback Example
// scraper.imgScrape(url,(data)=>{
//   console.log("Data from scraper recieved");
//   console.log(data);
// });

//Promise Example
scraper.imgScrape2(url)
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
