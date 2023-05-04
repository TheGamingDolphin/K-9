const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  async execute(interaction) {
    await interaction.reply(
      `<:Affirmative:1019680728759419011> Latency is ${
        Date.now() - interaction.createdTimestamp
      }ms`
    );
  },
};
