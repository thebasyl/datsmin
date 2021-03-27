const Discord = require('discord.js');
var nimlib = require('../nimlib');

module.exports = {
        name: 'shop',
	description: 'buy stuff.',
    execute(message, args, coinStorage) 
    {
        return message.reply("comming soon, i think?");
        
        let mainShopEmbed = new Discord.MessageEmbed()
        .setColor("#7289da")
        .setTitle('Dat Shop')
        .addField('Isle 1: ', "`/shop 1`")
        .addField('Isle 2: ', "`/shop 2`")
        .addField('Isle 3: ', "`/shop 3`")
        .setThumbnail('https://i.imgur.com/2ZpNuQA.png')
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

        message.channel.send(mainShopEmbed);
    }
};
