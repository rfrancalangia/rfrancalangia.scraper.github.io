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
const path = 'odds.txt';
const cheerio = require('cheerio');
// const url = "http://www.espn.com/nba/lines/_/type/futures";
const url = "https://www.betonline.ag/sportsbook/futures-and-props/nba-futures";
const file = 'teams.json';

var easternConf = ["Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls", 
"Cleveland Cavaliers", "Detriot Pistons", "Indiana Pacers", "Miami Heat", "Milwaukee Bucks", "New York Nicks",
"Orlando Magic", "Philadelphia 76ers", "Toronto Raptors", "Washington Wizards"];

var westernConf = ["Dallas Mavericks", "Denver Nuggests", "Golden State Warriors", "Houston Rockets",
"Los Angeles Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Minnesota Timberwolves", "New Orleans Pelicans",
"Oklahoma Thunder", "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs", "Utah Jazz"];

function Team(name, division, conference){
	this.name = name;
	this.division = division;
	this.conference = conference;
	this.odds = [];
	this.dates = [];
	this.parallel = "true";
	this.addOdd = function(newOdd,date){
		this.odds.push(newOdd);
		this.dates.push(date);
	}
	this.checkParallel = function(err){
		if(this.odds.length != this.dates.length){
			this.parallel = 0;
		}
	}
}



function Date(str){

}

//Callback Example
// scraper.imgScrape(url,(data)=>{
//   console.log("Data from scraper recieved");
//   console.log(data);
// });

// Promise Example
// Get Date
scraper.ScrapePromiseTables(url, '#1-date')
.then((data) =>{
  console.log("data from scraper recieved");
  var $ = cheerio.load(data);
  // console.log($(data).text());
  var date = $(data).text();
  // JSON.stringify(date);
  console.log("b: "+date+" :e");
})
.catch((error)=>{
  console.log("Error scraping data");
})

var dbTeams = fs.readFileSync(file);
dbTeams = JSON.parse(dbTeams);
// console.log(dbTeams);
console.log(dbTeams.length);
// var NBAteams = [];
// NBAteams = dbTeams;
for(var i = 0; i < dbTeams.length; i++){
	console.log(dbTeams[i].name);
}
// for (var i = 0; i < easternConf.length; i++){
// 	var newTeam = new Team(easternConf[i], "NA", "Eastern");
// 	NBAteams.push(newTeam);
// }
// for (var i = 0; i < westernConf.length; i++){
// 	var newTeam = new Team(westernConf[i], "NA", "Western");
// 	NBAteams.push(newTeam);
// }
// fs.appendFileSync(file, JSON.stringify(NBAteams));
// console.log('Done');





// // Promise Example
// scraper.ScrapePromiseTables(url, '#1-date')
// .then((data) =>{
//   console.log("data from scraper recieved");
//   var $ = cheerio.load(data);
//   console.log($(data).text());
//   var date = $(data).text();
//   fs.writeFile(path,JSON.stringify(data),(error)=>{
//     if (error){
//       console.log(error);
//     }
//     console.log("Successfully wrote to "+path);
//   })
// })
// .catch((error)=>{
//   console.log("Error scraping data");
// })
