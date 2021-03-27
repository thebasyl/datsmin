const Discord = require('discord.js');

module.exports = {
    name: "verify",
    description: 'verify yourself.',
	execute(message, args, coinStorageCanary ) {
        
        var serverIcon = message.guild.iconURL();
        var serverSize = message.guild.members.cache.filter(member => !member.user.bot).size;
        var ServerTrueSize = message.guild.members.cache.size;
        var serverBots = ServerTrueSize - serverSize;     

        let VerifyEmbed = new Discord.MessageEmbed()
        .setColor("#25e82f")
        .setThumbnail(serverIcon)
        .addFields(
            { name : 'Server name', value: message.guild.name, inline: true },
            { name : 'Members', value: message.guild.members.cache.size, inline: true},
            { name: 'Bots', value: serverBots, inline: true }
        )
        .setTitle("Thankyou for joining this server! Enjoy your stay!");

        message.channel.bulkDelete(1, true)

        message.author.send(VerifyEmbed)

        const VerifiedRole = message.member.guild.roles.cache.find(role => role.name === 'Verified');

        if(!VerifiedRole)
        {
            const MemberRole = message.member.guild.roles.cache.find(role => role.name === 'Member');
            message.member.roles.add(MemberRole);
            return;
        }

        message.member.roles.add(VerifiedRole);
    }
}