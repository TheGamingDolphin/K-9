const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spin")
    .setDescription("K-9 will do a spin for you!"),
  async execute(interaction) {
    await interaction.reply(
      `https://tenor.com/view/doctor-who-k9-spin-fourth-doctor-robot-dog-gif-22054166`
    );
  },
};
