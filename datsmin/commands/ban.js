const Discord = require('discord.js');

module.exports = {
	name: 'ban',
    description: 'Bans an unwanted user. Kaboom.',
    
    execute(message, args) 
    {
        if (!message.member.roles.cache.some(r => ["Admin"].includes(r.name)))
            return message.reply("No permissions to use this command.");


        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server.");
        if (!member.bannable)
            return message.reply("I cannot ban this user. They have a higher role than me.")

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")

        member.ban()
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        warnChannel.send(`${member.user.tag} has been banned by ${message.author.tag}. Reason: ${reason}`)

    }
    
}; 
