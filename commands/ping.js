const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get some info about the bot!"),
  async execute(interaction) {
    await interaction.reply("I am K-9 Mark III. I am here to help.");
  },
};
