const Discord = require('discord.js');
//GPT-3 integration
const GPT3 = require('gpt3');
require("dotenv").config();

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});

// const gpt3 = new GPT3({
//     apiKey: process.env.GPT3-KEY
// });

client.on("ready", () => {
    console.log("Logged in as " + client.user.username);
});

client.on('message', async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('gpt3')) {
        let query = message.content.split(' ').slice(1).join(' ');
        // let response = await gpt3.query(query);

        // message.channel.send(response.data.choices[0].text);
        message.channel.send(query);
    }
});

client.login(process.env.TOKEN);