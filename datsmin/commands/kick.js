const Discord = require('discord.js');

module.exports = {
	name: 'kick',
    description: 'Kicks an unwanted user. Kaboom.',
    execute(message, args) 
    
    {
            async function kickhim() {

            if (!message.member.roles.cache.some(r => ["Admin"].includes(r.name)))
            return message.reply("No permissions to use this command.");

            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server.");
            if (!member.bannable)
                return message.reply("I cannot kick this user. They have a higher role than me.")

            let reason = args.slice(1).join(' ');
                if (!reason) reason = "No reason provided";

            await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

            const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")

            message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag}. Reason: "${reason}"`)
            warnChannel.send(`${member.user.tag} has been kicked by ${message.author.tag}. Reason: ${reason}`)

            }

            kickhim();

        }
    }
