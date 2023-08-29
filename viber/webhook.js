'use strict';

const env = require('dotenv').config();
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
    authToken: `${env.AUTH_TOKEN}`,
    name: "EchoBot",
    // It is recommended to be 720x720, and no more than 100kb.
    avatar: "https://t4.ftcdn.net/jpg/00/23/72/59/360_F_23725944_W2aSrg3Kqw3lOmU4IAn7iXV88Rnnfch1.jpg"
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});

// module.exports = bot;

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const http = require('http');
const port = process.env.PORT || 8080;

const ngrok = require('./get_public_url');
return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});

// // Viber will push messages sent to this URL. Web server should be internet-facing.
// const webhookUrl = process.env.WEBHOOK_URL;
//
// const httpsOptions = {
//     key: ...,
//     cert: ...,
//     ca: ...
// }; // Trusted SSL certification (not self-signed).
// https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));