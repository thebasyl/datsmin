const Discord = require('discord.js');

module.exports = {
	name: 'info',
	description: 'test command.',
    execute(message, args) 
    {
        var ping = Date.now() - message.createdTimestamp + "ms";

        let infoEmbed = new Discord.MessageEmbed()
        .setTitle('Info')
        .addField('Requested by:', message.author.username)
        .addField('Version', '1.0.0')
        .addField('Ping', ping + ' run `/ping` for more info!')
        .addField('Code by:', 'Nimstad, Suj, Taewoo, Hampu')
        .addField('Website by:', 'Nimstad')
        .addField('Art by:', 'Nimstad')
        .setThumbnail('https://i.imgur.com/Y9JzpFk.png')
        .setColor("#7289da")
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');


        message.channel.send(infoEmbed);
    }
};
