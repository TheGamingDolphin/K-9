const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doctor09")
    .setDescription("Alright then. If you want orders..."),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.editReply(
      "All right then. If you want orders, follow this one.\nKill yourself.\n`THE DALEKS MUST SURVIVE!`\nThe Daleks have failed! Why don't you finish the job, and make the Daleks extinct? Rid the universe of your filth! Why don't you just die!?\n\n\n`YOU WOULD MAKE A GOOD DALEK.`"
    );
  },
};
