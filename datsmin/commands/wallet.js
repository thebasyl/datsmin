const Discord = require('discord.js');

module.exports = {
	name: 'wallet',
	description: 'Check coins.',
        execute(message, args, coinStorageCanary) 
        {
                let senderId = message.author.id;
                let receiverId = args[0];

                if(!receiverId)
                {
                        let coinEmbed = new Discord.MessageEmbed()
                        .setTitle('Wallet')
                        .setColor("#7289da")
                        .addField(message.author.username + 's coins', coinStorageCanary.get(message.author.id))
                        .setThumbnail('https://i.imgur.com/9zINApQ.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

                        message.channel.send(coinEmbed);
                } else
                {
                        receiverId = receiverId.replace("<@", "").replace("!", "").replace(">", "");

                        let receiverIdName = message.mentions.users.first().username;

                        message.ment
                        
                        let coinEmbedForUser = new Discord.MessageEmbed()
                        .setTitle('Wallet')
                        .setColor("#7289da")
                        .addField(receiverIdName + 's coins', coinStorageCanary.get(receiverId))
                        .setThumbnail('https://i.imgur.com/9zINApQ.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

                        message.channel.send(coinEmbedForUser);
                }
	}
};
