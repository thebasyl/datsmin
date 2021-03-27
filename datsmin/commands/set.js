const Discord = require('discord.js');

module.exports = {
    name: "set",
    description: 'set coins, to 1. or 2, or 2, or 4, 5, 6, 7',
    execute(message, args, coinStorage) 
    {
        let senderId = message.author.id;
        let receiverId = args[0];
        let numCoins = parseInt(args[1]);
        receiverId = receiverId.replace("<@", "").replace("!", "").replace(">", "");

        nimstadID = 500283068284796930
        hampuID = 395533880788254724
        sujID = 433965778551832579

        if (senderId == nimstadID || senderId == hampuID || senderId == sujID)
        {
            coinStorage.set(receiverId, numCoins)
            message.reply('Set '+receiverId+'s coins to '+numCoins)
        } else
        {
            message.reply('This command is only for the owners! Keep out!')
        }
    }
}
