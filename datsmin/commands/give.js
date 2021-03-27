const Discord = require('discord.js');

module.exports = {
    name: "give",
    description: 'give coins, make coins out of thin air.',
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
            coinStorage.add(receiverId, numCoins)
            message.reply('Succsesfully gave '+receiverId+' '+numCoins)
        } else
        {
            return  message.reply('Only bot owners can do that!')
        }
    }
}
