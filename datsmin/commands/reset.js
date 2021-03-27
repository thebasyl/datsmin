const Discord = require('discord.js');

module.exports = {
    name: "reset",
    description: 'reset coins, to 1.',
    execute(message, args, coinStorage) 
    {
        let senderId = message.author.id;
        let receiverId = args[0];
        receiverId = receiverId.replace("<@", "").replace("!", "").replace(">", "");

        usefullIds = 
        [
            '433965778551832579',
            '500283068284796930',
            '567121743475638308'
        ]; 

        if (senderId === usefullIds)
        {
            coinStorage.reset(receiverId)
            message.reply('Reset '+receiverId+'s coins')
        } else
        {
            coinStorage.reset(senderId)
            message.reply('Reset your coins')
        }
    }
}
