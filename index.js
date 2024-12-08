//imports
const dotenv = require("dotenv");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
  BaseSelectMenuBuilder,
} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("node:fs");
const path = require("node:path");

dotenv.config();
//sets prefix and context
const PREFIX = "K-9";

//gets the openai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// create client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// sets the last channel
let channel = "915568009815416845";
let lastChannel = channel;
let c;

// allows messages to be sent through the terminal to appear as the bot
async function reader() {
  const rl = readline.createInterface({ input, output });

  c = client.channels.cache.get(channel);
  console.log(`#${c.name}`);

  while (true) {
    const answer = await rl.question("~> ");
    if (answer.indexOf("channel") === 0) {
      lastChannel = channel;
      channel = answer.split(" ")[1];
      c = client.channels.cache.get(channel);

      if (!c) {
        channel = lastChannel;
        c = client.channels.cache.get(channel);
        console.log("\x1b[31minvalid channel id\x1b[0m");
        console.log(`\n#${c.name}`);
      } else {
        console.log(`\n#${c.name}`);
      }
    } else if (answer.trim().length) {
      client.channels.cache.get(channel).send(answer);
    }
  }
}

//checks if the original message has been deleted, and if it has, sends message with a ping instead of a reply
function safeReply(message, reply) {
  openai.createModeration({ input: reply }).then(async (res) => {
    if (res.data.results[0].flagged) {
      safeReply(
        message,
        "My response was moderated. (This is an error, not an AI response)"
      );
      try {
        client.channels.cache
          .get("1018511988478967969")
          .send(`Moderated reply: ||${reply}||`);
      } catch (error) {
        client.channels.cache
          .get("915568009815416845")
          .send(`Moderated reply: ||${reply}||`);
      }
    }
    //if nothing is flagged, set the model and send the message to the AI
    else {
      message
        .reply(reply)
        .catch(() => message.channel.send(`<@${message.author.id}> ${reply}`));
    }
    return;
  });
}
// sets the gpt3 model
async function getGptResponse(prompt, model) {
  const gptResponse = await openai.createCompletion({
    model: model,
    prompt: `${prompt}. ###`,
    max_tokens: 60,
    temperature: 0.3,
    top_p: 0.3,
    presence_penalty: 0,
    frequency_penalty: 0.5,
    stop: ["\n", "END"],
  });
  // sets the reply to the AI response
  const reply = `${gptResponse.data.choices[0].text.trim()}`;
  if (reply.length) {
    if (!reply.includes("@")) {
      return reply;
    } else {
      const newReply = "```" + reply + "```";
      return newReply;
    }
  } else {
    return "Input unknown. Please try again. (This is an error, not an AI response)\nIf this keeps happening, please report the issue on the [support page](https://k-9.vercel.app/Support.html)";
  }
}
// when the client is ready and logged into the discord bot, log in the console.
client.on("ready", async () => {
  console.log("Logged in as " + client.user.username);
  reader();

  // Set the presence outside the callback function
  client.user.setPresence({
    activities: [
      {
        name: "the TARDIS",
        type: ActivityType.Watching,
      },
    ],
  });
  try {
    client.channels.cache
      .get("1018199943774732410")
      .send(`System restarting. All primary drives functioning.`);
  } catch (error) {
    client.channels.cache
      .get("915568009815416845")
      .send(`System restarting. All primary drives functioning.`);
  }

  //remove members from role
  try {
    const guild = client.guilds.cache.get("1018199943330140170");
    const members = await guild.members.fetch();
    members.forEach((member) => {
      setTimeout(() => {
        member.roles.remove("1124478121853321328").catch(console.log);
      }, 2000);
    });
  } catch (error) {}

  setInterval(() => {
    const now = new Date();

    // Send the message at midnight
    // if (now.getHours() === 0 && now.getMinutes() === 0) {
    //   try {
    //     const channel = client.channels.cache.get("1018199943774732410");
    //     channel.send(`Series 14 releases <t:1715382000:R>!`);
    //   } catch {
    //     const channel = client.channels.cache.get("915568009815416845");
    //     channel.send(`Series 14 releases <t:1715382000:R>!`);
    //   }
    // }
    // scheduled restart
    if (now.getHours() === 6 && now.getMinutes() === 0) {
      const { restart } = require("./restart");
      try {
        restart();
      } catch (error) {
        console.log("There was an issue while trying to restart");
      }
    }
    // Send the message at midday
    // if (now.getHours() === 12 && now.getMinutes() === 0) {
    //   try {
    //     const channel = client.channels.cache.get("1018199943774732410");
    //     channel.send(`Series 14 releases <t:1715382000:R>!`);
    //   } catch {
    //     const channel = client.channels.cache.get("915568009815416845");
    //     channel.send(`Series 14 releases <t:1715382000:R>!`);
    //   }
    // }
    // scheduled restart
    if (now.getHours() === 18 && now.getMinutes() === 0) {
      const { restart } = require("./restart");
      try {
        restart();
      } catch (error) {
        console.log("There was an issue while trying to restart");
      }
    }
  }, 60 * 1000); // Check every minute
});

//crash prevention
process.on("unhandledRejection", async (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason", reason);
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log("Uncaught Exception Monitor", err, origin);
});
//when a member joins, send them a DM
client.on("guildMemberAdd", async (member) => {
  const DMEmbed = new EmbedBuilder()
    .setColor("#003b6f")
    .setTitle("Welcome to Bigger on the Inside!")
    .setURL("https://k-9.vercel.app/index.html")
    .setDescription("I'm K-9, here to help :)")
    .setThumbnail("attachment://dog.png")
    .addFields(
      {
        name: "Getting started ",
        value:
          'Head back to the "Channels & Roles" section to get a colour role!\n\nWant to talk to me? Just put `K-9` before your message in the server! ',
      },
      { name: "\u200B", value: "\u200B" },
      {
        name: "Want to know what every channel is for? Click here!",
        value: "<#1018443553862586388>",
        inline: true,
      },
      {
        name: "Introduce yourself!",
        value: "<#1018442634005598269>",
        inline: true,
      }
    )
    .addFields({
      name: "Join the conversation!",
      value: "<#1018199943774732410>",
      inline: true,
    })
    .setImage("attachment://BOTI_logo.png")
    .setFooter({
      text: "Hope you enjoy your stay!!",
    });
  try {
    // Send a direct message to the member
    await member.send({
      embeds: [DMEmbed],
      files: ["./assets/dog.png", "./assets/BOTI_logo.png"],
    });
    if (member.guild.id === "1018199943330140170") {
      client.channels.cache
        .get("1018199943330140172")
        .send(
          `<:Affirmative:1019680728759419011> Welcome to Bigger on the Inside <@${member.id}>!`
        );
    }
  } catch (error) {
    client.channels.cache
      .get("1018199943330140172")
      .send(`Welcome to Bigger on the Inside <@${member.id}>!`);
  }
});

//checks if the message is from a bot or if the mesage doesn't contain the 'K-9' prefix
client.on("messageCreate", async function (message) {
  if (message.content == "!!restart") {
    const { restart } = require("./restart");

    await message.reply("Forcing restart");

    try {
      restart();
    } catch (error) {
      await message.channel.send("There was an issue while trying to restart");
    }
  }
  if (message.content.toLowerCase().includes("dw")) {
    await message.react(":dw:1086049130075394068");
  }
  if (message.content.toLowerCase().includes("jack")) {
    try{
    await message.reply("https://cdn.discordapp.com/attachments/915568009815416845/1315388340559679578/jork.png?ex=67573a5b&is=6755e8db&hm=251f0c4d5fea133ce9a130837f179a3bec1c35280216b42a3879ecd010af7036&");
  } catch {message.channel.send("https://cdn.discordapp.com/attachments/915568009815416845/1315388340559679578/jork.png?ex=67573a5b&is=6755e8db&hm=251f0c4d5fea133ce9a130837f179a3bec1c35280216b42a3879ecd010af7036&")}}
  if (message.content.toLowerCase().includes("ianto")) {
    try{
    await message.reply("https://cdn.discordapp.com/attachments/915568009815416845/1315388341071646813/fanta.png?ex=67573a5b&is=6755e8db&hm=bc604262cbfa70a8295135ba8e774ca705418e8ab18a699fa5d2818a43472003&");
  } catch {message.channel.send("https://cdn.discordapp.com/attachments/915568009815416845/1315388341071646813/fanta.png?ex=67573a5b&is=6755e8db&hm=bc604262cbfa70a8295135ba8e774ca705418e8ab18a699fa5d2818a43472003&")}}
  if (message.content.toLowerCase().includes("gwen")) {
    try{
      await message.reply("https://cdn.discordapp.com/attachments/915568009815416845/1315388341830811678/hen.png?ex=67573a5b&is=6755e8db&hm=ba12d7dda0ddcc3752d7700005c7e5afa99fc77815b28c088c1d46c422c3f5c4&");
    } catch {message.channel.send("https://cdn.discordapp.com/attachments/915568009815416845/1315388341830811678/hen.png?ex=67573a5b&is=6755e8db&hm=ba12d7dda0ddcc3752d7700005c7e5afa99fc77815b28c088c1d46c422c3f5c4&")}}
  if (message.content.toLowerCase().includes("owen")) {
    try{
      await message.reply("https://cdn.discordapp.com/attachments/915568009815416845/1315388342866804736/going.png?ex=67573a5b&is=6755e8db&hm=7520167ec6f8580e01a62f381998aa2de46cbe10c125a87f317e13a9993edec5&");
    } catch {message.channel.send("https://cdn.discordapp.com/attachments/915568009815416845/1315388342866804736/going.png?ex=67573a5b&is=6755e8db&hm=7520167ec6f8580e01a62f381998aa2de46cbe10c125a87f317e13a9993edec5&")}}
  if (message.content.toLowerCase().includes("tosh")) {
    try{
      await message.reply("https://cdn.discordapp.com/attachments/915568009815416845/1315388342451441664/bosh.png?ex=67573a5b&is=6755e8db&hm=b9a79b4fc1a4e6b514927a4d8756d3c7a2e8ea2f9e33025eb0fe2d63d1383c46&");
    } catch {message.channel.send("https://cdn.discordapp.com/attachments/915568009815416845/1315388342451441664/bosh.png?ex=67573a5b&is=6755e8db&hm=b9a79b4fc1a4e6b514927a4d8756d3c7a2e8ea2f9e33025eb0fe2d63d1383c46&")}}

  const randomNumber = Math.random() * 1000;
  // Check if the number is less than 1 (1 in 1000 chance)
  if (randomNumber < 1) {
    await message.react("🫃");
  }
  if (
    message.author.bot ||
    !message.content.toLowerCase().startsWith(PREFIX.toLowerCase())
  ) {
    return;
  }
  //runs the message through the moderation to make sure nothing harmful is being sent
  openai
    .createModeration({ input: message.content.slice(3) })
    .then(async (res) => {
      if (res.data.results[0].flagged) {
        safeReply(
          message,
          "Your message has been moderated. Please refrain from trying to generate the following content: hate, self-harm, sexual, violence. (This is an error, not an AI response)"
        );
      }
      //if nothing is flagged, set the model and send the message to the AI
      else {
        const gptResponse = await getGptResponse(
          message.content.substring(3),
          "ft:babbage-002:personal::8euAZ98S"
        );
        safeReply(message, gptResponse);
      }
      return;
    });
});

//set commands
client.commands = new Collection();
//set cooldowns
client.cooldowns = new Collection();
client.COOLDOWN_SECONDS = 5; // replace with desired cooldown time in seconds

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

//checks the commands folder for js files
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}
//tries to run the command
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content:
          "There was an error while executing this command! If this keeps happening, please report the issue on the [support page](https://k-9.vercel.app/Support.html)",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content:
          "There was an error while executing this command! If this keeps happening, please report the issue on the [support page](https://k-9.vercel.app/Support.html)",
        ephemeral: true,
      });
    }
  }
});

// log into the bot using the client token
client.login(process.env.TOKEN);