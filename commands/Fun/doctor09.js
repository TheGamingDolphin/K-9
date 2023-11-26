const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doctor09")
    .setDescription("Fantastic!"),
  async execute(interaction) {
    await interaction.deferReply();
    const messages = await interaction.channel.messages.fetch({ limit: 9 });
    const emoji = "<:Doctor09:1158056178547437768>";
    // Add a reaction to each message
    messages.forEach((msg) => {
      msg.react(emoji);
    });
    await interaction.editReply(emoji);
  },
};
