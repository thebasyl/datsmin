const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'custom embed.',
	execute(message, args) {
        let embedTitle = args.shift();
        let embedDescription = args.join(' ');

        if(!embedTitle)
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#f5f5f5")
            .setTitle("Embed")
            .setDescription("No arguments were found! Run `//help` for more information!");

            return message.channel.send(errorEmbed);
        }

        for (i = 0; i < 999; i++) 
        { 
            embedTitle = embedTitle.replace("-", " ");
        }

        let customEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${embedTitle}`)
        .setDescription(`${embedDescription}`);

        message.channel.send(customEmbed);
    }
}
