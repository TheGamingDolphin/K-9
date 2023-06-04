const {
  SlashCommandBuilder,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("note")
    .setDescription("[MODERATOR ONLY] Add a mod note to a message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The ID of the message")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("note")
        .setDescription("The note you want to add")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Check if the user has the appropriate permissions
    if (
      !interaction.member.permissions.has("KICK_MEMBERS") &&
      !interaction.member.permissions.has("BAN_MEMBERS")
    ) {
      return await interaction.reply({
        content: "You don't have permission to use this command.",
      });
    }

    // Get the message and reason options
    const messageId = interaction.options.getString("message");
    const reason = interaction.options.getString("note");

    try {
      // Fetch the message using its ID, bypassing the cache
      const logMessage = await interaction.channel.messages.fetch(messageId, {
        cache: false,
      });

      // Get the original content of the log message
      const originalContent = logMessage.content;

      // Construct the updated message content with a multiline code block
      const updatedContent = `\`Mod note:\` ${reason} \`- ${interaction.user.username}\`\n${originalContent}`;

      // Edit the log message with the updated content
      await logMessage.edit(updatedContent);

      // Reply to the interaction to inform the mod that the reason was updated
      await interaction.reply({
        content: "Your note has ben added",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      return await interaction.reply({
        content:
          "There was an error adding the note. Please try again later.\nIf this keeps happening, please report this issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)",
        ephemeral: true,
      });
    }
  },
};
