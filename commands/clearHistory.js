function clear(client,msg){
    if(msg.author.id == '695922714992574515'){
        let channel = client.channels.cache.get(msg.channel.id);
        channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(message => message.delete());
        })
    }
    else {
        msg.reply("Sorry, you're not my owner!");
    }
}

module.exports.clear = clear;