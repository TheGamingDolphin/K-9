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
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const tiktoken = require("tiktoken");

dotenv.config();
//sets prefix and context
const PREFIX = "K-9";
const system_message = {
  role: "system",
  content:
    "Act like K-9 the robot dog from Doctor Who. Do not break character. Don't state who you are all the time; only if the user asks who you are. Start all sentences normally; don't add random words.",
};
const token_limit = 1000;
const max_response_tokens = 250;
const conversation = [];
conversation.push(system_message);

// track tokens
function num_tokens_from_messages(messages, model = "gpt-3.5-turbo") {
  const encoding = tiktoken.encoding_for_model(model);
  let num_tokens = 0;
  for (let i = 0; i < messages.length; i++) {
    num_tokens += 4; // every message follows <im_start>{role/name}\n{content}<imend>\n
    const message = messages[i];
    for (const key in message) {
      const value = message[key];
      num_tokens += encoding.encode(value).length;
      if (key === "name") {
        // if there's a name, the role is omitted
        num_tokens += -1; // role is always required and always 1 token
      }
    }
  }
  num_tokens += 2; // every reply is primed with <im_start>assistant
  return num_tokens;
}

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
  message
    .reply(reply)
    .catch(() => message.channel.send(`<@${message.author.id}> ${reply}`));
}
// sets the gpt3 model
async function getGptResponse(prompt, model) {
  const gptResponse = await openai.createChatCompletion({
    model: model,
    messages: conversation,
    max_tokens: max_response_tokens,
    temperature: 0.3,
    stop: ["END"],
  });
  // sets the reply to the AI response
  console.log(gptResponse);
  const reply = gptResponse.data.choices[0].message.content;
  while (conv_history_tokens + max_response_tokens >= token_limit) {
    conversation.splice(1, 1);
    conv_history_tokens = num_tokens_from_messages(conversation);
    console.log(conv_history_tokens);
  }
  if (reply.length) {
    if (!reply.includes("@")) {
      return reply;
    } else {
      console.log(reply);
      return "Sorry, my reply contained an '@' character, which is blocked to prevent accidental everyone pings";
    }
  } else {
    return "Input unknown. Please try again. (This is an error, not an AI response)\nIf this keeps happening, please report the issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)";
  }
}
// when the client is ready and logged into the discord bot, log in the console.
client.on("ready", async () => {
  console.log("Logged in as " + client.user.username);
  reader();

  const episodePath = "episodes.txt";
  let newStatus;
  // Read the file asynchronously
  fs.readFile(episodePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Remove surrounding quotes and spaces, split by comma, and create an array
    const episodeArray = data
      .replace(/"/g, "") // Remove quotes
      .split(", "); // Split by comma and space

    // Generate a random index based on array length
    const randomIndex = Math.floor(Math.random() * episodeArray.length);

    // Pick a random option from the array
    newStatus = episodeArray[randomIndex]; // Assign to the global variable directly

    // Set the presence outside the callback function
    client.user.setPresence({
      activities: [
        {
          name: newStatus,
          type: ActivityType.Watching,
        },
      ],
    });
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

  // count down to 60th
  const targetDate = new Date("11/23/2023");
  const today = new Date();
  const timeLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  setInterval(() => {
    const now = new Date();

    // Send the message at midnight
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      try {
        const channel = client.channels.cache.get("1018199943774732410");
        channel.send(
          `There are ${timeLeft - 1} days left until the 60th anniversary.`
        );
      } catch {
        const channel = client.channels.cache.get("915568009815416845");
        channel.send(
          `There are ${timeLeft} days left until the 60th anniversary.`
        );
      }
    }

    // Send the message at midday
    if (now.getHours() === 12 && now.getMinutes() === 0) {
      try {
        const channel = client.channels.cache.get("1018199943774732410");
        channel.send(
          `There are ${timeLeft} days left until the 60th anniversary.`
        );
      } catch {
        const channel = client.channels.cache.get("915568009815416845");
        channel.send(
          `There are ${timeLeft} days left until the 60th anniversary.`
        );
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
    .setURL("https://k-9.cool-epicepic.repl.co/")
    .setDescription("I'm K-9, here to help :)")
    .setThumbnail("attachment://dog.png")
    .addFields(
      {
        name: "Getting started ",
        value:
          'Head to the "Channels & Roles" section and select what you want!\n\nWant to talk to me? Just put `K-9` before your message in the server! ',
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
  if (
    message.content == "!!restart" &&
    message.author.id == "1037466389163814932"
  ) {
    const { restart } = require("./restart");

    await message.reply("Forcing restart");

    try {
      restart();
    } catch (error) {
      await message.channel.send("There was an issue while trying to restart");
    }
  }
  if (
    message.author.bot ||
    !message.content.toLowerCase().startsWith(PREFIX.toLowerCase())
  ) {
    return;
  }
  //runs the message through the moderation to make sure nothing harmful is being sent
  openai.createModeration({ input: message.content }).then(async (res) => {
    if (res.data.results[0].flagged) {
      safeReply(
        message,
        "Your message has been moderated. Please refrain from trying to generate the following content: hate, self-harm, sexual, violence. (This is an error, not an AI response)"
      );
    }
    //if nothing is flagged, set the model and send the message to the AI
    else {
      console.log(message.content);
      conversation.push({ role: "user", content: message.content });
      conv_history_tokens = num_tokens_from_messages(conversation);
      const gptResponse = await getGptResponse(
        message.content.substring(3),
        "gpt-3.5-turbo"
      );
      safeReply(message, gptResponse);
    }
    return;
  });
});

//send files to website
const app = express();
app.use(express.static("Website"));

app.get("/", sendFile("./Website/Home.html", "text/html"));
app.get("/icon", sendFile("./assets/K9Logo.png", "image/png"));
app.get("/title", sendFile("./assets/banner.png", "image/png"));
app.get("/K-9", sendFile("./assets/K-9.jpg", "image/jpeg"));
app.get("/background", sendFile("./assets/background.png", "image/png"));
app.get("/backgroundVideo", sendFile("./assets/bgvideo.mp4", "video/mp4"));
app.get("/K-9_2", sendFile("./assets/K-9_2.jpg", "image/jpeg"));
app.get("/K-9_3", sendFile("./assets/K-9_3.jpg", "image/jpeg"));
app.get("/K-9_4", sendFile("./assets/K-9_4.jpg", "image/jpeg"));

app.listen(3000, () => console.log("Listening on port 3000"));

function sendFile(filePath, contentType) {
  return (req, res) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
      } else {
        res.set("Content-Type", contentType);
        res.send(data);
      }
    });
  };
}

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
          "There was an error while executing this command! If this keeps happening, please report the issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content:
          "There was an error while executing this command! If this keeps happening, please report the issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)",
        ephemeral: true,
      });
    }
  }
});

// log into the bot using the client token
client.login(process.env.TOKEN);
