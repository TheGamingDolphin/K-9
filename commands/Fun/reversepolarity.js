const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reversepolarity")
    .setDescription("Reverses the polarity??"),
  async execute(interaction) {
    console.log(
      interaction.channel.permissionsFor(interaction.client.user).toArray()
    );
    if (
      !interaction.channel
        .permissionsFor(interaction.client.user)
        .has("ModerateMembers")
    ) {
      await interaction.reply(
        `I don't have the right permissions enabled to do that in this server.`
      );
    } else if (!interaction.member.manageable) {
      // The above if statement determines whether the client user is above the member
      // who ran the command in the hierarchy, according to role position and guild ownership.
      interaction.reply(
        "Your role means that you cannot reverse the polarity."
      );
    } else {
      await interaction.reply(
        `You reversed the polarity of... yourself?? <@${interaction.user.id}> cannot send messages for 10 seconds while the polarity corrects itself`
      );
      interaction.member.timeout(10000, "polarity reversed");
    }
  },
};
