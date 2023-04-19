import dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import express from "express";

import fs from "node:fs";
import path from "node:path";
import fetch from "node-fetch";
import FormData from "form-data";

import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath.path);
const outStream = fs.createWriteStream("./output.mp3");

const PREFIX = "K-9 ";
const PREFIX2 = ",";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

console.log(openai);

// create client with necessary intents
import { Client, Collection, Constants, Events, GatewayIntentBits} from "discord.js";


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});



let channel = "1071813708461916160";
let lastChannel = channel;
let c;

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

      //dm a user

      // client.users.fetch("394153008054796299", false).then((user) => {
      //   user.send(answer);
      // });
    }
  }
}

function safeReply(message, reply) {
  message
    .reply(reply)
    .catch(() => message.channel.send(`<@${message.author.id}> ${reply}`));
}
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
  const reply = `${gptResponse.data.choices[0].text.trim()}`;
  if (reply.length) {
    if (!reply.includes("@")) {
      return reply;
    } else {
      return "Sorry, my reply contained an '@' character, which is blocked for obvious reasons";
    }
  } else {
    return "Input unknown. Please try again. (This is an error, not an AI response)";
  }
}

client.on("ready", () => {
  console.log("Logged in as " + client.user.username);
  reader();
});

client.on("messageCreate", async function (message) {
  if (message.attachments.size > 0) {
    const attachment = message.attachments.first();
    if (attachment.contentType.includes("audio")) {
      const response = await fetch(attachment.url);
      const buffer = await response.buffer();
      const filename = "./input.ogg";
      fs.writeFileSync(`./${filename}`, buffer);
      // temporary
      const outStream = fs.createWriteStream("./output.mp3");
      outStream.on("close", async () => {
        console.log("Write stream closed");
        const __dirname = path.dirname(new URL(import.meta.url).pathname);

        const filePath = path.join(__dirname, "output.mp3");
        const whisperModel = "whisper-1";
        const formData = new FormData();
        formData.append("model", whisperModel);
        formData.append("file", fs.createReadStream(filePath));
        // Transcribe audio
        const transcript = await openai.createTranscription(
          fs.createReadStream("output.mp3"),
          "whisper-1"
        );
        console.log(transcript.data.text);
        message.channel.send(
          "Message transcript:\n ```" + transcript.data.text + "```"
        );
      });
      ffmpeg()
        .input("./input.ogg")
        .audioQuality(96)
        .toFormat("mp3")
        .on("error", (error) => console.log(`Encoding Error: ${error.message}`))
        .on("end", () => {
          console.log("Audio Transcoding succeeded !");
          outStream.end();
        })
        .pipe(outStream, { end: true });
    }
  }

  if (
    message.author.bot ||
    !(
      message.content.indexOf(PREFIX) === 0 ||
      (message.content.indexOf(PREFIX2) === 0 &&
        message.author.id === process.env.PRIVV)
    )
  ) {
    return;
  }
  openai.createModeration({ input: message.content }).then(async (res) => {
    if (res.data.results[0].flagged) {
      safeReply(
        message,
        "Your message has been moderated. Please refrain from trying to generate the following content: hate, self-harm, sexual, violence. (This is an error, not an AI response)"
      );
    } else if (message.content.indexOf(PREFIX) === 0) {
      const gptResponse = await getGptResponse(
        message.content.substring(3),
        "ada:ft-personal:k-9-mark-ii-1-2023-02-11-19-23-19",
        console.log(message.content.substring(3))
      );
      safeReply(message, gptResponse);
    } else {
      const gptResponse = await getGptResponse(
        message.content.substring(1),
        "davinci:ft-personal:k-9-mark-ii-2023-02-11-16-43-01"
      );
      safeReply(message, gptResponse);
    }
    return;
  });
});

const app = express();
app.use(express.static("Website"));
app.get("/", (req, res) => {
  fs.readFile("./Website/Home.html", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "text/html");
      res.send(data);
    }
  });
});
app.get("/icon", (req, res) => {
  fs.readFile("./Website/Assets/K9Logo.png", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/title", (req, res) => {
  fs.readFile("./Website/Assets/banner.png", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/K-9", (req, res) => {
  fs.readFile("./Website/Assets/K-9.jpg", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/background", (req, res) => {
  fs.readFile("./Website/Assets/background.png", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/backgroundVideo", (req, res) => {
  fs.readFile("./Website/Assets/vortex.mp4", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "video/mp4");
      res.send(data);
    }
  });
});
app.get("/K-9_2", (req, res) => {
  fs.readFile("./Website/Assets/K-9_2.jpg", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/K-9_3", (req, res) => {
  fs.readFile("./Website/Assets/K-9_3.jpg", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});
app.get("/K-9_4", (req, res) => {
  fs.readFile("./Website/Assets/K-9_4.jpg", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.set("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));

client.commands = new Collection();

const commandsPath = path.dirname(new URL(import.meta.url).pathname);
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  import(filePath).then(module => {
    const command = module.default;
    if (command && "data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }).catch(err => console.log(`Error while importing ${filePath}:`, err));
}


client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
});

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

client.login(process.env.TOKEN);