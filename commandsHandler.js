const savvy = require("./commands/savvy.js");
const coinToss = require("./commands/coinToss");
const clearHistory = require("./commands/clearHistory");
const { request } = require("websocket");

function handleCommand(client,msg) {
    let request = msg.content.replace("hd!","");
    console.log(request);
    //all the regex used into the switch
    let regexAddQuote = /^addquote\s"(.*)"$/;
    let regexGetQuoteAPI = /^savvy$/;
    let regexGetThisQuote = /^savvy\s([0-9]+)$/;
    let regexGetQuoteLocal = /^getquote$/;
    let regexMyId = /^whoami$/;
    let regexHelp = /^help$/;
    let regexCoinToss = /^cointoss$/;
    let regexClearHistory = /^clear$/;

    //available commands
    const allCommands = ['addquote "example"', 'savvy', 'savvy {integer}', 'getquote', 'whoami', 'help', 'cointoss', 'clear'];

    switch(true) {

        case regexAddQuote.test(request):

            let regexResult = regexAddQuote.exec(request);
            if(regexResult!=null){
                savvy.addQuoteAPI(msg,result[1],function(quote){
                    try{
                        msg.reply(quote);
                    }
                    catch(err){
                        msg.reply(err);
                    }
                });
            }
            break;

        case regexGetQuoteAPI.test(request):
            savvy.getQuoteAPI(msg,function(quote){
                try{
                    msg.reply(quote);
                }
                catch(err){
                    msg.reply(err);
                }
            });
            break;

        case regexGetThisQuote.test(request):
            let result = regexGetThisQuote.exec(request);
            if(result!=null){
                savvy.getThisQuoteAPI(msg,parseInt(result[1]),function(quote){
                    try{
                        msg.reply(quote);
                    }
                    catch(err){
                        msg.reply(err);
                    }
                });
            }
            break;
        
        case regexGetQuoteLocal.test(request):
        
            msg.reply(savvy.getQuote());
            break;
        
        case regexMyId.test(request):

            msg.reply(msg.author.id);
            break;
        
        
        case regexHelp.test(request):
            let commands = "";
            for(let i = 0; i < allCommands.length; ++i)
                commands += allCommands[i]+'\n';
            msg.reply(commands);
            break;
        
        case regexCoinToss.test(request):

            msg.reply(coinToss.flip());
            break;
        
        case regexClearHistory.test(request):

            clearHistory.clear(client,msg);
            break;
        
        default:
            msg.reply("Type \'help\' to check all the available commands!");
            break;
    }
    
}

module.exports.handleCommand = handleCommand;

