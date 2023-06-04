const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Replies with the bot's avatar!"),
  async execute(interaction) {
    await interaction.reply({ files: ["./assets/dog.png"] });
  },
};
