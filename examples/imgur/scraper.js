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

const request = require('request');
const cheerio = require('cheerio');

//Callback Example
exports.imgScrape = (url,cb) => {
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

//Promise Example
exports.imgScrape2 = (url) => {
  return new Promise((resolve, reject) =>{
    request(url,(error,resp,body)=>{
      if(error){
        reject(error);
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
    resolve(image);
    });
  })
}
