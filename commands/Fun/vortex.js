const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vortex")
    .setDescription("Stare into the Untempered Schism"),
  async execute(interaction) {
    if (interaction.guild.id === "1018199943330140170") {
      await interaction.reply(
        `https://cdn.discordapp.com/attachments/406894156259262465/1050167760203821156/Time_Vortex.mp4`
      );
    } else {
      await interaction.reply(
        `Sorry, the vortex is not available for this server.\nFor every feature, visit https://discord.gg/FEsXdZehwB`
      );
    }
  },
};
