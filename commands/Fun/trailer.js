const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trailer")
    .setDescription("See the latest Doctor Who trailers!"),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply(
      `60th Anniversary Trailers:\nTrailer 1: https://www.youtube.com/watch?v=FtzRP0fycII\nTrailer 2: https://www.youtube.com/watch?v=CpHEh5ZnQMo`
    );
  },
};
