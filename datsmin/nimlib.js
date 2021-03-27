// Noel Mide Nimstad and Suj useful stuff

const { Message, DiscordAPIError } = require("discord.js");

module.exports = {
    random: function (max) {
          return Math.floor(Math.random() * max);
    }
};