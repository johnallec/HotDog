const fs = require('fs');
const process = require('process');
var path = require('path');


function getQuote(){
    let quotesPath = path.join(__dirname, '..', 'resources', 'piratesOfTheCaribbeanQuotes.txt');
    let quotes = fs.readFileSync(quotesPath, 'utf8');
    if(quotes!=null)
        quotes = quotes.split("\r\n");
    console.log("********************"+quotesPath);
    if(quotes != null) {
        return quotes[Math.floor(Math.random()*quotes.length)];
    }
    else {
        return 'Sorry, no quotes available!';
    }
}

module.exports.getQuote = getQuote;