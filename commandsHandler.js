const savvy = require("./commands/savvy.js");
const coinToss = require("./commands/coinToss");
const clearHistory = require("./commands/clearHistory");
const { request } = require("websocket");

function handleCommand(client,msg) {
    let request = msg.content.replace("hd! ","").toLowerCase();
    let regex = new RegExp(/addquote\s"(.*)"/);
    let result = regex.exec(request);
    if(result!=null){
        savvy.addQuoteAPI(msg,result[1],function(quote){
            try{
                msg.reply(quote);
            }
            catch(err){
                msg.reply(err);
            }
        });
        return;
    }
    regex = new RegExp(/savvyapi\s([0-9]+)/);
    result = regex.exec(request);
    if(result!=null){
        savvy.getThisQuoteAPI(msg,parseInt(result[1]),function(quote){
            try{
                msg.reply(quote);
            }
            catch(err){
                msg.reply(err);
            }
        });
        return;
    }
    switch(request){
        case 'print myid':
            msg.reply(msg.author.id);
            break;
        case 'savvy':
            msg.reply(savvy.getQuote());
            break;
        case 'savvyapi':
            savvy.getQuoteAPI(msg,function(quote){
                try{
                    msg.reply(quote);
                }
                catch(err){
                    msg.reply(err);
                }
            });
            break;
        case 'show commands':
            msg.channel.send('print myid\nsavvy\nclear history\ncoin toss');
            break;
        case 'coin toss':
            msg.reply(coinToss.flip());
            break;
        case 'clear history':
            clearHistory.clear(client,msg);
            break;
        default:
            msg.reply("Type \'show commands\' to check all the commands available!");
            break;
    }
    
}
module.exports.handleCommand = handleCommand;