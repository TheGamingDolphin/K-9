const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("[MODERATOR ONLY] Kick a member. Delete, Delete, DELETE!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to delete")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(`The reason for kicking the member`)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const kickUser = interaction.client.users.cache.get(ID);

    if (!interaction.member.permissions.has("KickMembers"))
      return await interaction.editReply({
        content: "You don't have kick perms. You can't delete others.",
      });
    if (interaction.member.id === ID)
      return await interaction.editReply({
        content: "You cannot kick yourself... <:Handles:1019777437963407361>",
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";

    const dmEmbed = new EmbedBuilder()
      .setColor("#5812a3")
      .setTitle("Click here to rejoin!")
      .setURL("https://discord.gg/FEsXdZehwB")
      .setThumbnail(`attachment://dog.png`)
      .addFields({
        name: `You have been kicked from ${interaction.guild.name}`,
        value: `Reason: ${reason}\nYou can still rejoin! Just click the link above!`,
      })
      .setImage(`attachment://BOTI_logo.png`)
      .setTimestamp()
      .setFooter({
        text: "Safe travels!",
      });

    const embed = new EmbedBuilder()
      .setColor("#5812a3")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${kickUser} has been kicked.\nReason: ${reason}\n\nID: ${
          interaction.options.getUser("user").id
        }`
      );

    await kickUser
      .send({
        embeds: [dmEmbed],
        files: ["./assets/dog.png", "./assets/BOTI_logo.png"],
      })
      .catch((err) => {
        try {
          interaction.channel.send("I couldn't DM the kicked user.");
        } catch (err) {
          interaction.guild.channels.cache
            .get("915568009815416845")
            .send("I couldn't DM the kicked user.");
        }
      });
    await interaction.editReply({ embeds: [embed] });

    try {
      interaction.guild.channels.cache
        .get("1018289802065485826")
        .send({ embeds: [embed] });
    } catch (err) {
      interaction.guild.channels.cache
        .get("915568009815416845")
        .send({ embeds: [embed] });
    }

    await interaction.guild.members
      .kick(kickUser.id, { reason })
      .then(() => {
        kickSuccessful = true;
      })
      .catch((err) => {
        interaction.editReply({
          content:
            "I cannot kick this member!\nIf this is unexpected, please kick the member with a different bot and then report this issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)",
        });
      });
  },
};
