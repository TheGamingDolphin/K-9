const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("episode")
    .setDescription("Get a random episode!"),

  async execute(interaction) {
    await interaction.deferReply();
    const episodePath = "episodes.txt";
    let episode;
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
      episode = episodeArray[randomIndex]; // Assign to the global variable directly

      interaction.editReply(`${episode}`);
    });
  },
};
