const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vortex")
    .setDescription("Stare into the Untempered Schism"),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply({ files: ["./assets/vortex.mp4"] });
  },
};
