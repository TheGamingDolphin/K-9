const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affirmative")
    .setDescription("Yippee!"),
  async execute(interaction) {
    await interaction.reply(
      `https://cdn.discordapp.com/attachments/1018199943774732410/1104398550642724986/affirmative.mp4`
    );
  },
};
