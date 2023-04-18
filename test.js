const dotenv = require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const express = require("express");
const path = require("node:path");
const fetch = require("node-fetch");
const axios = require("axios");
const FormData = require("form-data");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("node:fs");
ffmpeg.setFfmpegPath(ffmpegPath);
const outStream = fs.createWriteStream("./output.mp3");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

client.on("messageCreate", async function (message) {
  if (message.author.bot) return;

  if (message.attachments.size > 0) {
    const attachment = message.attachments.first();
    if (attachment.contentType.includes("audio")) {
      const response = await fetch(attachment.url);
      const buffer = await response.buffer();
      const filename = "./input.ogg";
      fs.writeFileSync(`./${filename}`, buffer);
      console.log(`Saved ${filename}`);
      // temporary
      ffmpeg()
        .input("./input.ogg")
        .audioQuality(96)
        .toFormat("mp3")
        .on("error", (error) => console.log(`Encoding Error: ${error.message}`))
        .on("end", async () => {
          console.log("Audio Transcoding succeeded !");
          // Add your code here
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
          console.log(response.data);
          try {
            fs.unlinkSync("input.ogg");
            fs.unlinkSync("output.mp3");
            console.log("Deleted files successfully.");
          } catch (error) {
            console.log(error);
          }
          console.log(transcript.data.text);
          return transcript.data.text;
        })
        .pipe(outStream, { end: true });
    }
  }
});
client.on("ready", () => {
  console.log("Logged in as " + client.user.username);
});

client.login(
  "MTA3NTAzNjc0NjU0ODUyMzEwOA.GT70_l.lNpG5QhgLVsprXWIn3ui16P9lUXdLNfujHlSIA"
);
