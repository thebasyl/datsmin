const Discord = require('discord.js');

module.exports = {
    name: "pay",
    description: 'Send coins.',
    execute(message, args, coinStorage) 
    {
        let senderId = message.author.id;
        let receiverId = args[0];
        let numCoins = parseInt(args[1]);

        if (receiverId == undefined || !receiverId.startsWith("<@"))
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#7289da")
            .setTitle('Error 404!')
            .addField('Error: ', 'the person you were trying to get pay does not exsist! Please run `//help` for more info!')
            .setThumbnail('https://i.imgur.com/GJswOsW.png')
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.bulkDelete(1, true);

            message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});

            return;
        }

        receiverId = receiverId.replace("<@", "").replace("!", "").replace(">", "");
        console.log(receiverId+' + '+senderId)

        if (receiverId == senderId)
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#7289da")
            .setTitle('Error 404!')
            .addField('Error: ', 'You cant pay yourself!')
            .setThumbnail('https://i.imgur.com/GJswOsW.png')
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.bulkDelete(1, true);

            message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});

            return;
        }
        
        if (isNaN(numCoins))
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#7289da")
            .setTitle('Error 404!')
            .addField('Error: ', 'Dont try to break me pls. tank u!')
            .setThumbnail('https://i.imgur.com/GJswOsW.png')
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.bulkDelete(1, true);

            message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});

            return;
        }

        if (numCoins < 1)
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#7289da")
            .setTitle('Error 404!')
            .addField('Error: ', 'You cant pay less than 1 coin!')
            .setThumbnail('https://i.imgur.com/GJswOsW.png')
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.bulkDelete(1, true);

            message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});

            return;
        }

        let senderBalance = coinStorage.get(senderId);

        if (senderBalance < numCoins)
        {
            let errorEmbed = new Discord.MessageEmbed()
            .setColor("#7289da")
            .setTitle('Error 404!')
            .addField('Error: ', 'You dont have enough coins!')
            .setThumbnail('https://i.imgur.com/GJswOsW.png')
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.bulkDelete(1, true);

            message.channel.send(errorEmbed).then(msg => {msg.delete({timeout: 10000})});

            return;
        }

        coinStorage.subtract(senderId, numCoins);
        coinStorage.add(receiverId, numCoins);
        
        let successfulPayment = new Discord.MessageEmbed()
        .setTitle("Transaction complete!")
        .setColor("#47d155")
        .setDescription(message.author.username + ` has given <@${receiverId}> ${numCoins} coin(s)`)
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

        message.channel.send(successfulPayment);
    }
}
