const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const handler = require("./commandsHandler");

client.login("OTM5NTg1MTkwMzE2MTAxNjkz.Yf6-5g.hSz6c7IDGy3OT2zhKYdiKY0Z3Kw");

client.on('ready',function(){
    console.log("Available");
});



client.on('message',function(msg){
    if(msg.author.bot)
        return;
    if(msg.channel.id == '939587597670416394' && msg.content.startsWith("hot!dog ")){
        handler.handleCommand(client,msg);
    }
})