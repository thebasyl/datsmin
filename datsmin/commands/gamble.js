const Discord = require('discord.js');
var nimlib = require('../nimlib');

module.exports = {
        name: 'gamble',
	description: 'gamble coins.',
	execute(message, args, coinStorageCanary) {
                let gambleAmt = parseInt(args[0]);
                let userBalance = coinStorageCanary.get(message.author.id);

                let gambleReturn = nimlib.random(2);

                if(!gambleAmt)
                {
			let nocoinsgambled = new Discord.MessageEmbed()
                        .setColor("#7289da")
                        .setTitle('Error 404!')
                        .addField('Error: ', "You need to specify how much you're willing to gamble!")
                        .setThumbnail('https://i.imgur.com/GJswOsW.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
            
                        message.channel.bulkDelete(1, true);
            
                        return message.channel.send(nocoinsgambled).then(msg => {msg.delete({timeout: 10000})});
                }
		
		if (gambleAmt < 1) 
		{
			let nocoinsgambled = new Discord.MessageEmbed()
                        .setColor("#7289da")
                        .setTitle('Error 404!')
                        .addField('Error: ', "You need to specify how much you're willing to gamble!")
                        .setThumbnail('https://i.imgur.com/GJswOsW.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
            
                        message.channel.bulkDelete(1, true);
            
                        message.channel.send(nocoinsgambled).then(msg => {msg.delete({timeout: 10000})});
		}
		

                if(gambleAmt > userBalance)
                {
                        let errorEmbed = new Discord.MessageEmbed()
                        .setColor("#7289da")
                        .setTitle('Error 404!')
                        .addField('Error: ', "You dont have enough coins to gamble " + `${gambleAmt}` + " Dat coins!")
                        .setThumbnail('https://i.imgur.com/GJswOsW.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
            
                        message.channel.bulkDelete(1, true);
            
                        message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});
            
                        return;
		}
        
		
		if(gambleAmt < 30) {
			
			let nomoney = new Discord.MessageEmbed()
                        .setColor("#7289da")
                        .setTitle('Error 404!')
                        .addField('Error: ', "You need to bet more than 30 coins to gamble!")
                        .setThumbnail('https://i.imgur.com/GJswOsW.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
            
                        message.channel.bulkDelete(1, true);
            
                        message.channel.send(nomoney).then(msg => {msg.delete({timeout: 10000})});
            
                        return;
		}
		
              

                if (gambleReturn == 0)
                {
                        coinStorageCanary.add(message.author.id, gambleAmt);
                        let winReturn = gambleAmt * 2
			let gamblewincoins = userBalance + winReturn

                        let gambleEmbedWon = new Discord.MessageEmbed()
                        .setTitle('Gamble')
                        .setColor("#b6b46b")
                        .addField('Result:', "You won the gamble and earned " + `${gambleAmt}` + " Dat coins! Congratulations " + `${message.author.username}` + "! You now have a balance of " + `${gamblewincoins}` + '.')
                        .setThumbnail('https://i.imgur.com/ReW9I8k.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

                        message.channel.send(gambleEmbedWon);
                }      
                else
                {
                        coinStorageCanary.subtract(message.author.id, gambleAmt);

                        let gambleEmbedLost = new Discord.MessageEmbed()
                        .setAuthor(message.author.username)
                        .setColor("#964936")
                        .setDescription("You lost the gamble and lost " + `${gambleAmt}` + " Dat coins!")
                        .setThumbnail('https://i.imgur.com/9zINApQ.png')
                        .setTimestamp()
                        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
                        
                        message.channel.send(gambleEmbedLost);
                }      
        }
};
