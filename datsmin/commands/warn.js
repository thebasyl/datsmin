//setup Discord.js + fs.writefile
const Discord = require('discord.js');
const fs = require('fs')
let warns = JSON.parse(fs.readFileSync("./warnStorage.json", "utf8"));
//define command
module.exports = {
    name: "warn",
    description: "Reports a member",
    usage: "<mention, id>",
    execute(message, args) 
    {
        usefullIds = 
        [
            '433965778551832579',
            '500283068284796930',
            '567121743475638308'
        ]; 

        let senderId = message.author.id;
        const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")
        let gMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!warns[gMember.id]) warns[gMember.id] = 
        {
            warns: 0 
        };

        warns[gMember.id].warns++;

	    //check if message is deletable, then delete
        if (message.deletable) message.delete();

    //if is not a member
        if (!gMember) {
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));
		}

	//report start
        if (!args[1]) {
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        }

            
        if (!warnChannel) {
            return message.channel.send("Couldn't find a `#infraction-log` channel").then(m => m.delete(5000));
        } 
	//add a warning
	
	 //add warning to warnings.json
         fs.writeFile("./warnStorage.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
         })

	 //create embed
        let warnEmbed = new Discord.MessageEmbed()
       .setColor("#ff0202")
        .setTimestamp()
       .setFooter(message.guild.name, message.guild.iconURL)
     .setAuthor("Reported member")
    .setDescription(`**Member:** ${gMember} (${gMember.user.id})
     **Reported by:** ${message.member}
     **Reported in:** ${message.channel}
     **Reason:** ${args.slice(1).join(" ")}
     **Warnings:** ${warns[gMember.id].warns}`);

        return warnChannel.send(warnEmbed);
    }
}
