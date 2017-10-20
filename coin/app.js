/* ***************************************************************
*
*  File Name : server.js
*  Created By : rfrancalangia
*
*  Creation Date : 10-19-2017
*  Last Modified : Thu Oct 19 10:42:04 2017
*  Description :
*
* *************************************************************** */

// $apikey='241e4b5a06dc48839415f8ed3f883637';
// $apisecret=':81e127b44b9e402ebb9eca8a434b0028';
// $nonce=time();
// $uri='https://bittrex.com/api/v1.1/market/getopenorders?apikey='.$apikey;//.'&nonce='.$nonce;
// $sign=hash_hmac('sha512',$uri,$apisecret);
// $ch = curl_init($uri);
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('apisign:'.$sign));
// $execResult = curl_exec($ch);
// $obj = json_decode($execResult);
var API_KEY ='241e4b5a06dc48839415f8ed3f883637';
var API_SECRET='81e127b44b9e402ebb9eca8a434b0028';

const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const bittrex = require('node-bittrex-api');

// var file = fs.readFileSync('coins.json');
//var words = JSON.parse(data);
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
    ctx.body = 'Hello from koa js';
  } else if (url === '/date'){
    ctx.body = new Date();
  } else if (url === '/getMarkets'){
    ctx.body = 'found';
    bittrex.getmarkets(function (data, err){
      if (err){
        return console.log(err);
      }
      for(var i in data.result){
        var holderCoin = new Coin(data.result[i].BaseCurrency,
          "BitTrex", data.result[i].BaseCurrency+'-'+data.result[i].MarketCurrency);
          coinArray.push(holderCoin);
        }
        // for (var j = 0; j < coinArray.length; j++){
          fs.writeFileSync(file, JSON.stringify(coinArray));
          // fs.writeFile(file, holder, (err) => {
            // if (err) throw err;
            // console.log('Saved ' + j + ' '+ holder);
          // });
          // coinArray[j].showLog();
        // }
        // fs.writeFile(file, "coinArray[i]", (err) => {
        //   if (err) throw err;
        //   // console.log('Saved');
        // });
        console.log("Number of Coins: " + coinArray.length);
      });
      //  bittrex.getmarketsummaries( function( data, err ) {
      //    if (err) {
      //      return console.error(err);
      //    }
      //    for( var i in data.result ) {
      //      bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
      //        console.log( ticker );
      //      });
      //    }
      //  });
    } else {
      ctx.body = 'Not Found';
      ctx.status = 404;
    }
  });

  app.listen(3000);
