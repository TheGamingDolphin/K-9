const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reversepolarity")
    .setDescription("Reverses the polarity??")
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    if (
      !interaction.channel
        .permissionsFor(interaction.client.user)
        .has("ModerateMembers")
    ) {
      await interaction.editReply(
        `I don't have the right permissions enabled to do that. Please report this issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)`
      );
    } else if (
      !interaction.member.manageable ||
      interaction.member.permissions.has("Administrator")
    ) {
      // The above if statement determines whether the client user is above the member
      // who ran the command in the hierarchy, according to role position and guild ownership.
      interaction.editReply(
        "Your role means that you cannot reverse the polarity."
      );
    } else {
      await interaction.editReply(
        `You reversed the polarity of... yourself?? <@${interaction.user.id}> cannot send messages for 10 seconds while the polarity corrects itself`
      );
      interaction.member.timeout(10000, "polarity reversed");
    }
  },
};
