const savvy = require("./commands/savvy.js");
const coinToss = require("./commands/coinToss");
const clearHistory = require("./commands/clearHistory");

function handleCommand(client,msg) {
    switch(msg.content.replace("hot!dog ","").toLowerCase()){
        case 'print myid':
            msg.reply(msg.author.id);
            break;
        case 'savvy':
            msg.reply(savvy.getQuote());
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