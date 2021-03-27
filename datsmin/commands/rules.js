const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'rules',
    description: 'Prune up to 99 messages.',
    execute(message, args) {
        let ruleNumber = parseInt(args[0])

        if (!args[0]) {
            message.channel.send({embed: {
              color: 6052956,
              title: "Rules:",
              fields: [
                { name: "Rule", value: "Rule 1\nRule 2\nRule 3\nRule 4\nRule 5", inline: true},
                { name: "Command", value: '/rules 1\n/rules 2\n/rules 3\n/rules 4\n/rules 5', inline: true},
                { name: "Note", value: "if you see anyone breaking these rules, report it imediatley to user 500283068284796930"}
              ]
            }
          });

          return;
        }

        if (isNaN(args[0])) {
            let NaNembed = new Discord.MessageEmbed()
            .setTitle("Rules")
            .setColor("#8f1f1f")
            .setDescription("The message you sent contained words!")
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');
        
            message.channel.send(NaNembed);
        }      

        if(ruleNumber > 5) {
            let ruleAboveFive = new Discord.MessageEmbed()
            .setTitle("Rules")
            .setColor("#6e5452")
            .setDescription("You need to specify a number between 1 and 5! For more information run /rules.")
            .setFooter('Datsmin', 'https://i.imgur.com/QI6uxsW.png');

            message.channel.send(ruleAboveFive);
        }

        if (ruleNumber == 1) {
            return message.channel.send({embed: {
                color: 7241884,
                fields: [
                    { name: "Rule 1", value: "No exoloits"}
                ]
            }
        });
        } else if (ruleNumber == 2) {
            return message.channel.send({embed: {
                color: 7241884,
                fields: [
                    { name: "Rule 2", value: "No alt accounts"}
                ]
            }
        });
        } else if (ruleNumber == 3) {
            return message.channel.send({embed: {
                color: 7241884,
                fields: [
                    { name: "Rule 3", value: "No botting, this is also against the TOS"}
                ]
            }
        });
        } else if (ruleNumber == 4) {
            return message.channel.send({embed: {
                color: 7241884,
                fields: [
                    { name: "Rule 4", value: "Please dont use embeds in a harmful way"}
                ]
            }
        });
        } else if (ruleNumber == 5) {
            return message.channel.send({embed: {
                color: 7241884,
                fields: [
                    { name: "Rule 5", value: "No forcing payments"}
                ]
            }
        });
        };
    },
};