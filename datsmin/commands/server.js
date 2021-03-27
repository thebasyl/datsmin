const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'server',
	description: 'test command.',
    execute(message, args) 
    {
        const client = new Discord.Client();

        return message.reply('under construction');

        var serverIcon = message.guild.iconURL();
        const guild = message.guild;
        var serverOwner = message.guild.member(guild.owner) ? guild.owner.toString() : guild.owner.user.tag;
        let serverID = message.guild.id;
        var serverSize = message.guild.members.cache.filter(member => !member.user.bot).size();
        var ServerTrueSize = message.guild.members.cache.size;
        var serverBots = ServerTrueSize - serverSize;
        const creationDate = moment.utc(message.channel.guild.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

        let x = Date.now() - message.channel.guild.createdAt;
        let y = Date.now() - (message.channel.guild).createdAt;
        const daysAgo = Math.floor(y / 86400000) + ' days';

        let infoEmbed = new Discord.MessageEmbed()
        .setTitle('Server')
        .addField('Requested by:', message.author.username)
        .addField('Server', message.guild.name)
        .addFields
        (
            { name: 'Owner', value: serverOwner, inline: true },
            { name: 'Server ID', value: serverID, inline: true },
            { name: 'Members', value: serverSize + ' members', inline: true },
            { name: 'Bots', value: serverBots + ' bots', inline: true },
            { name: 'Created at', value: creationDate, inline: true },
            { name: 'days since creation', value: daysAgo, inline: true },
        )
        .setThumbnail(serverIcon)
        .setColor("#7289da")
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');


        message.channel.send(infoEmbed);
    }
}