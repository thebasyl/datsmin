const Discord = require('discord.js');

module.exports = {
    name: 'ping',
	description: 'Check ping.',
	execute(message, args, coinStorage) {     
        var ping = Date.now() - message.createdTimestamp + "ms";
        var API = message.createdTimestamp;
        var DateNow = Date.now();

        return message.channel.send({embed: {
            color: 13380395,
            title:":ping_pong: Pong!",
            fields: [
                { name: "Latency:", value: `${ping}`},
                { name: "Message Created Time Stamp", value: `${API}`},
                { name: "Date now", value: `${DateNow}`}
            ]
        }
    })
}
};
