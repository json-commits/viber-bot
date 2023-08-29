require('dotenv').config();
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
    authToken: process.env.AUTH_TOKEN,
    name: "EchoBot",
    avatar: "https://t4.ftcdn.net/jpg/00/23/72/59/360_F_23725944_W2aSrg3Kqw3lOmU4IAn7iXV88Rnnfch1.jpg"
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(message);
});

module.exports = bot;
