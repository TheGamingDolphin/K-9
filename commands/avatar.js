const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Replies with the bot's avatar!"),
  async execute(interaction) {
    await interaction.reply(
      `https://cdn.discordapp.com/attachments/915568009815416845/1103682438187724851/New_Project.png`
    );
  },
};
