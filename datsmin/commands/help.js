const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'test command.',
    execute(message, args) 
    {
        var ping = Date.now() - message.createdTimestamp + "ms";

        let infoEmbed = new Discord.MessageEmbed()
        .setTitle('Help')
        .addField('Visit our website', 'https://NoelNim.github.io')
        .addField('Thankyou for using Datsmin', 'Nimstad, Suj, Froggers')
        .setColor("#7289da")
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');


        message.channel.send(infoEmbed);
    }
};
