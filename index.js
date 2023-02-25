import dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import express from "express";
import fs from "fs";

dotenv.config();

const PREFIX = "K-9 ";
const PREFIX2 = ",";

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
    return reply;
  } else {
    return "Input unknown. Please try again. (This is an error, not an AI response)";
  }
}

client.on("ready", () => {
  console.log("Logged in as " + client.user.username);
  reader();
});

client.on("messageCreate", function (message) {
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

client.login(process.env.TOKEN);
