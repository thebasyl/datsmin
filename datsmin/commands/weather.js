const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: "weather",
    description: 'weather yourself.',
    execute(message, args, coinStorageCanary ) 
    {
        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Please specify a location')
    
            if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location, if you named a country please specify a location in that country');
    
            var current = result[0].current;
            var location = result[0].location;
    
            const weatherinfo = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor('RANDOM')
            .addField('Timezone', `UTC+${location.timezone}`, true)
            .addField('Temprature Unit', 'Celsius', true)
            .addField('Temperature', `${current.temperature}°`, true)
            .addField('Wind', current.winddisplay, true)
            .addField('Feels like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
    
    
            message.channel.send(weatherinfo);
        })
    }
}