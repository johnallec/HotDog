const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const handler = require("./commandsHandler");
require("dotenv").config();

client.login(process.env.HOTDOGTOKEN);

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