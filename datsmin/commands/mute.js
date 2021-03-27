const Discord = require('discord.js');

module.exports = {
	name: 'mute',
    description: 'Mutes someone who is doing naughty things. Shhhhhhhh....',
    execute(message, args) 
    {
        if (!message.member.roles.cache.some(r => ["Moderator"].includes(r.name)))
        return message.reply("No permissions to use this command.");

        const mutedRole = message.member.guild.roles.cache.find(role => role.name === 'Muted');
        const VerifiedRole = message.member.guild.roles.cache.find(role => role.name === 'Verified');

        let target = message.mentions.members.first();
        if (!target)
            return message.reply("Please mention a valid member of this server.");

        if (!args[1]) {
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        }
        target.roles.remove(VerifiedRole);
        target.roles.add(mutedRole)
        
        const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")

        message.channel.send(`${target.user.tag} has been muted by ${message.author.tag}. Reason: "${args.slice(1).join(" ")}"`)
        warnChannel.send(`${target.user.tag} has been muted by ${message.author.tag}. Reason: ${args.slice(1).join(" ")}`)         
        }
};
