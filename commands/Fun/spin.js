const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spin")
    .setDescription("K-9 will spin!"),
  async execute(interaction) {
    await interaction.reply({ files: ["./assets/spin.gif"] });
  },
};
