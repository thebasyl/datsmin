const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'user',
	description: 'users.',
    execute(message, args) 
    {
        var targetedMember = message.mentions.users.first();

        var targetedUserID = targetedMember.id;
        var userAvatar = targetedMember.avatarURL();
        var targetedMemberStatus = targetedMember.presence.status;

        if (targetedMemberStatus === 'dnd') { targetedMemberStatus = 'Do not disturb'; }
        if (targetedMemberStatus === 'online') { targetedMemberStatus = 'Online'; }
        if (targetedMemberStatus === 'idle') { targetedMemberStatus = 'Idle'; }
        if (targetedMemberStatus === 'offline') { targetedMemberStatus = 'Offline'; } 

        let x = Date.now() - targetedMember.createdAt;
        let y = Date.now() - message.guild.members.cache.get(targetedMember.id).joinedAt;
        const joined = Math.floor(y / 86400000);

        const joineddate = moment.utc(targetedMember.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");

        console.log(targetedMember);

        let avatarEmbed = new Discord.MessageEmbed()
        .setColor("#7289da")
        .setTitle('User info')
        .addField('Requested by:', message.author.username)
        .addField('Targeted user:', targetedMember.username)
        .addFields
        (
            { name: 'User ID', value: targetedUserID, inline: true },
            { name: 'Status', value: targetedMemberStatus, inline: true },
            { name: 'Account Created On:', value: `${moment.utc(targetedMember.createdAt).format("dddd, MMMM Do YYYY")}`, inline: true },
            { name: 'Joined the server at:', value: `${joineddate} \n> ${joined} day(S) Ago`, inline: true },
        )
        .setThumbnail(userAvatar)
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

        message.channel.send(avatarEmbed);
    }
}