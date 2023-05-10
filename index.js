//imports
const dotenv = require("dotenv");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

dotenv.config();

//sets prefix
const PREFIX = "K-9 ";

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
  return reply;
}
// when the client is ready and logged into the discord bot, log in the console.
client.on("ready", () => {
  console.log("Logged in as " + client.user.username);
  reader();
});

//when a member joins, send them a DM
client.on("guildMemberAdd", async (member) => {
  if (member.guild.id === "1018199943330140170") {
    try {
      // Send a direct message to the member
      const DMEmbed = new EmbedBuilder()
        .setColor("#003b6f")
        .setTitle("Welcome to Bigger on the Inside!")
        .setURL("https://k-9.cool-epicepic.repl.co/")
        .setDescription("I'm K-9, here to help :)")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/915568009815416845/1103682438187724851/New_Project.png"
        )
        .addFields(
          {
            name: "Getting started ",
            value:
              "Just head to <#1018266915409514608> and click the button! Simple as that!\nThen, these links will start working! 👇👇",
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Grab some roles!",
            value: "<#1018263794427891742>",
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
        .setImage(
          "https://cdn.discordapp.com/attachments/1018266915409514608/1018486366843191457/New_Project_73.png"
        )
        .setTimestamp()
        .setFooter({
          text: "Hope you enjoy your stay!!",
        });

      await member.send({ embeds: [DMEmbed] });
    } catch (error) {
      console.error("Error sending DM:", error);
    }
  }
});

//checks if the message is from a bot or if the mesage doesn't contain the 'K-9' prefix
client.on("messageCreate", function (message) {
  if (message.author.bot || !(message.content.indexOf(PREFIX) === 0)) {
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
      const gptResponse = await getGptResponse(
        message.content.substring(3),
        "ada:ft-personal:k-9-mark-ii-1-2023-02-11-19-23-19",
        console.log(message.content.substring(3))
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
app.get("/icon", sendFile("./Website/Assets/K9Logo.png", "image/png"));
app.get("/title", sendFile("./Website/Assets/banner.png", "image/png"));
app.get("/K-9", sendFile("./Website/Assets/K-9.jpg", "image/jpeg"));
app.get(
  "/background",
  sendFile("./Website/Assets/background.png", "image/png")
);
app.get(
  "/backgroundVideo",
  sendFile("./Website/Assets/vortex.mp4", "video/mp4")
);
app.get("/K-9_2", sendFile("./Website/Assets/K-9_2.jpg", "image/jpeg"));
app.get("/K-9_3", sendFile("./Website/Assets/K-9_3.jpg", "image/jpeg"));
app.get("/K-9_4", sendFile("./Website/Assets/K-9_4.jpg", "image/jpeg"));

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
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// log into the bot using the client token
client.login(process.env.TOKEN);
