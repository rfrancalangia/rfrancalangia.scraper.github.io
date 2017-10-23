/* ***************************************************************
*
*  File Name : app.js
*  Created By : rfrancalangia
*
*  Creation Date : 10-19-2017
*  Last Modified : Thu Oct 19 20:31:05 2017
*  Description : This is an app that scrapes the desired
*  information from BitTrex and returns it in a JSON file.
*
* *************************************************************** */

var API_KEY ='241e4b5a06dc48839415f8ed3f883637';
var API_SECRET='81e127b44b9e402ebb9eca8a434b0028';

const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const bittrex = require('node-bittrex-api');

var file = 'coins.json';

function Coin(newName, newExchange, newPair){
  this.name = newName;
  this.exchange = newExchange;
  this.pair = newPair;
  this.showLog = function(){
    console.log(this.name + ": {");
    console.log("Exchange: "+ this.exchange);
    console.log("Pair: "+this.pair);
    console.log("},");
  }
}

bittrex.options({
  'apikey': API_KEY,
  'apisecret': API_SECRET
});

app.use(async ctx => {
  var coinArray = [];
  console.log(ctx.request);
  var url = ctx.request.url;
  if (url === '/'){
    ctx.body = 'If you wish to run the getmarkets app, please go to /getMarkets';
  } else if (url === '/getMarkets'){
    ctx.body = 'found';
    bittrex.getmarkets(function (data, err){
      if (err){
        return console.log(err);
      }
      fs.writeFileSync(file, "");
      for(var i in data.result){
        var holderCoin = new Coin(data.result[i].BaseCurrency,"BitTrex", data.result[i].BaseCurrency+'-'+data.result[i].MarketCurrency);
        coinArray.push(holderCoin);
        // fs.appendFileSync(file, JSON.stringify(holderCoin));
        // fs.appendFileSync(file, "\n");
      }
      fs.writeFileSync(file, JSON.stringify(coinArray));
      console.log("Finished: number of Coins: " + coinArray.length);
    });
  } else {
    ctx.body = 'Not Found';
    ctx.status = 404;
  }
});

app.listen(3000);
