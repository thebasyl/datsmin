const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
let warns = JSON.parse(fs.readFileSync("./warnStorage.json", "utf8"));
var coinStorageCanary = require('./coinStorageCanary.js')();

var nimlib = require('./nimlib');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Beep Boop');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, coinStorageCanary);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command! Please report this to the owners at the github link listed on /help. Error: ' + error);
    }
});

client.on("message", async message => {
    let coinAmt = nimlib.random(50)+1;
    let baseAmt = nimlib.random(50)+1;

    let toolTip = nimlib.random(5)+1;
    let toolTipRequiredAmt = 3

    if(message.author.bot) return;

    if (coinAmt === baseAmt) 
    {
        let randomAmt = nimlib.random(9) + nimlib.random(9) + nimlib.random(2);

        console.log(randomAmt);

        coinStorageCanary.add(message.author.id, randomAmt);

        if (toolTip === toolTipRequiredAmt)
        {   
            let coinEmbed = new Discord.MessageEmbed()
            .setColor("#b6b46b")
            .addField("You earned coins " + `${message.author.username}` + "!", "Did you know you can use /wallet to check your balance?")
            .setTimestamp()
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.send(coinEmbed).then(msg => {msg.delete({timeout: 3500})});

            return;
        }
   
        let coinEmbed = new Discord.MessageEmbed()
        .setColor("#b6b46b")
        .setTitle("You earned coins " + `${message.author.username}` + "!")
        .setTimestamp()
        .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

        message.channel.send(coinEmbed).then(msg => {msg.delete({timeout: 3500})});

        return;
    }

    return;

    forbiddenWords = 
    [
        'arse',
        'ass',
        'asshole',
        'bastard',
        'bitch',
        'bollocks',
        'bugger',
        'cunt',
        'dick',
        'dickhead',
        'effing',
        'frigger',
        'fuck',
        'goddamn',
        'godsdamn',
        'shit',
        'nigger',
        'nigga',
        'prick',
        'shit',
        'slut',
        'twat',
        'swt1',
        'cock'
    ]; 

    for (var i = 0; i < forbiddenWords.length; i++) 
    {
        if (message.content.includes(forbiddenWords[i])) 
        {
            message.channel.bulkDelete(1, true).catch(err => 
            {
                console.error(err);
                message.channel.send('There was an error trying to delete your swear word');
            })
            
            message.reply({embed: 
            {
                color: 16712194,
                title: "Swearing is not allowed in this server"
            }});

                const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")
                
                if (!warns[message.author.id]) warns[message.author.id] = 
                {
                    warns: 0 
                };

                warns[message.author.id].warns++;
                
                fs.writeFile("./warnStorage.json", JSON.stringify(warns), (err) =>
                {
                    if (err) console.log(err)
                })
                //make embed
                let warnEmbedSwear = new Discord.MessageEmbed()
                .setTitle('Warning')
                .setColor("#7289da")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setAuthor("Reported member")
                .setDescription(`**> Member:** <@${message.author.id}>
                **> Reported by:** Datsmin
                **> Reported in:** ${message.channel}
                **> Reason:** Typed a swear word`)
                .setFooter('Info sent by Datsmin Canary', 'https://i.imgur.com/ZKFcopW.png');
        
        
                return warnChannel.send(warnEmbedSwear);
        }};

    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { 
        message.channel.bulkDelete(1, true).catch(err => {
                    console.error(err);
                    message.channel.send('There was an error trying to delete your link');
            }) 
                    message.reply({embed: {
                        color: 16712194,
                        title: "Link deleted. Invite links aren't allowed here"
                    }})
                    const warnChannel = message.guild.channels.cache.find(channel => channel.name === "infraction-log")
                //add warning if none
                if (!warns[message.author.id]) warns[message.author.id] = {
                        warns: 0 
                 };
                     warns[message.author.id].warns++;
            
                     fs.writeFile("./warnStorage.json", JSON.stringify(warns), (err) => {
                        if (err) console.log(err)
                     }) 
 
            //create embed
                let warnEmbedInvite = new Discord.MessageEmbed()
                .setTitle('Warning')
                .setColor("#7289da")
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL)
                .setAuthor("Reported member")
                .setDescription(`**> Member:** <@${message.author.id}>
                **> Reported by:** Datsmin
                **> Reported in:** ${message.channel}
                **> Reason:** Sent an invite link`)
                .setFooter('Info sent by Datsmin Canary', 'https://i.imgur.com/ZKFcopW.png');
    
    
            return warnChannel.send(warnEmbedInvite);
        }
    });

    client.login(token);
