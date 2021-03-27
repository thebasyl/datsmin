//setup Discord.js + fs.writefile
const Discord = require('discord.js');
const fs = require('fs')
let warns = JSON.parse(fs.readFileSync("./warnStorage.json", "utf8"));
//define command
module.exports = {
    name: "warns",
    description: "Reports a member",
    usage: "<mention, id>",
    execute(message, args) 
    {
        let gMember = message.mentions.members.first();

        if (!warns[gMember.id]) warns[gMember.id] = 
        {
            warns: 0 
        };

      //if is not a member
        if (!gMember) 
        {
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));
        }
        
	 //create embed
        let warnEmbed = new Discord.MessageEmbed()
        .setColor("#ff0202")
     .setTimestamp()
     .setFooter(message.guild.name, message.guild.iconURL)
     .setAuthor("Reported member")
     .setDescription(`**Member:** ${gMember} (${gMember.user.id})
     **Requested by:** ${message.member}
     **Requested in:** ${message.channel}
     **Warnings:** ${warns[gMember.id].warns}`);

        message.channel.send(warnEmbed);
        return;
    }
}
