const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help with K-9"),
  async execute(interaction) {
    await interaction.deferReply();
    const command = interaction.options.getString("command");
    await interaction.editReply(
      "To speak to me, start your message with `K-9`\n__Links__:\n[K-9 website](https://k-9.cool-epicepic.repl.co/)\n[Support page](https://k-9.cool-epicepic.repl.co/Support.html)\n[Feature request](https://k-9.cool-epicepic.repl.co/Request.html)\n[Testing server](https://discord.gg/xwMWhNHMd8)"
    );
  },
};
