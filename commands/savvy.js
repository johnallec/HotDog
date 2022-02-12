const fs = require('fs');
const process = require('process');
var path = require('path');
var http = require('http');

function getQuote(){
    let quotesPath = path.join(__dirname, '..', 'resources', 'piratesOfTheCaribbeanQuotes.txt');
    let quotes = fs.readFileSync(quotesPath, 'utf8');
    if(quotes!=null)
        quotes = quotes.split("\r\n");
    if(quotes != null) {
        return quotes[Math.floor(Math.random()*quotes.length)];
    }
    else {
        return 'Sorry, no quotes available!';
    }
}

function getQuoteAPI(msg,callback){
    let random = Math.floor(Math.random()*31);
    var quoteId = {
        host: 'localhost',
        port: 3000,
        path: '/api/quotes/'+random
    };
    var conn = http.get(quoteId, function(res){
        res.setEncoding('utf8');
        res.on('data', function (data) {
            callback(JSON.parse(data).quote);
        });
        
    });
    conn.on('error', function(err){
        callback(err.message);
    })
}

function getThisQuoteAPI(msg,id,callback){
    var quoteId = {
        host: 'localhost',
        port: 3000,
        path: '/api/quotes/'+id
    };
    var conn = http.get(quoteId, function(res){
        res.setEncoding('utf8');
        res.on('data', function (data) {
            callback(JSON.parse(data).quote);
        }); 
    });
    conn.on('error', function(err){
        callback(err.message);
    })
}

function addQuoteAPI(msg,quote,callback){
    let obj = {"quote":quote};
    obj = JSON.stringify(obj);
    var addQuote = {
        host: 'localhost',
        port: 3000,
        path: '/api/quotes',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': obj.length
          }
    };
    var conn = http.request(addQuote, function(res){
        res.on('data', function(data){
            data = JSON.parse(data);
            callback(data.quote + " has been added");
        })
    });
    conn.write(obj);
    conn.end();
}

module.exports.getQuote = getQuote;
module.exports.getQuoteAPI = getQuoteAPI;
module.exports.getThisQuoteAPI = getThisQuoteAPI;
module.exports.addQuoteAPI = addQuoteAPI;