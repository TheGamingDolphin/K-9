require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const PREFIX = ".";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// create client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Logged in as " + client.user.username);
});

client.on("messageCreate", function (message) {
  if (
    // message.author === client.user ||
    !(message.author.id === "1037466389163814932") ||
    message.content.indexOf(PREFIX) === 0
  )
    return;

  openai.createModeration({ input: message.content }).then((res) => {
    if (res.data.results[0].flagged) {
      message.reply(
        "this is not a AI generated message, it is moderated, don't be a bitch and get me banned, ty and fuck you"
      );
    } else {
      (async () => {
        const gptResponse = await openai.createCompletion({
          model: "davinci:ft-personal:k-9-2023-02-10-21-04-50",
          prompt: `${message.content}. ###`,
          max_tokens: 60,
          temperature: 0.3,
          top_p: 0.3,
          presence_penalty: 0,
          frequency_penalty: 0.5,
          stop: ["\n", "END"],
        });
        const reply = `${gptResponse.data.choices[0].text.trim()}`;
        if (reply.length) {
          message.reply(reply);
        } else {
          message.reply("Sorry, there was an error, try again.");
        }
      })();
    }
  });
  return;
});

client.login(process.env.TOKEN);
