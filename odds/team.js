/* ***************************************************************
 *
 *  File Name : team.js
 *  Created By : rfrancalangia
 *
 *  Creation Date : 10-03-2017
 *  Last Modified : Tue Oct  3 10:46:50 2017
 *  Description :
 *
 * *************************************************************** */

function Team(name, division, odds) {
  this.name = name;
  this.division = division;
  this.odds = odds;
  this.updateOdds = function(newOdds){
    this.odds = newOdds;
  }
}
exports.Team = Team();
