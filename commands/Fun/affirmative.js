const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affirmative")
    .setDescription("Yippee!"),
  async execute(interaction) {
    await interaction.reply({ files: ["./assets/affirmative.mp4"] });
  },
};
