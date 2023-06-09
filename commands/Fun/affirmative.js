const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affirmative")
    .setDescription("Yippee!"),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply({ files: ["./assets/affirmative.mp4"] });
  },
};
