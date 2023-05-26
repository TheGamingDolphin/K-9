const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const kickUser = interaction.client.users.cache.get(ID);

    if (!interaction.member.permissions.has("KickMembers"))
      return await interaction.reply({
        content: "You don't have kick perms. You can't delete others.",
      });
    if (interaction.member.id === ID)
      return await interaction.reply({
        content: "You cannot kick yourself... <:Handles:1019777437963407361>",
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";

    const dmEmbed = new EmbedBuilder()
      .setColor("#003b6f")
      .setTitle("Click here to rejoin!")
      .setURL("https://discord.gg/FEsXdZehwB")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/915568009815416845/1103682438187724851/New_Project.png"
      )
      .addFields({
        name: `You have been kicked from ${interaction.guild.name}`,
        value: `Reason: ${reason}\nYou can still rejoin! Just click the link above!`,
      })
      .setImage(
        "https://cdn.discordapp.com/attachments/1035684381005729902/1111776490464481363/New_Project_73.png"
      )
      .setTimestamp()
      .setFooter({
        text: "Safe travels!",
      });

    const embed = new EmbedBuilder()
      .setColor("#003b6f")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${
          kickUser.tag
        } has been kicked.\nReason: ${reason}\n\nID: ${
          interaction.options.getUser("user").id
        }`
      );

    let kickSuccessful = false;

    await interaction.guild.members
      .kick(kickUser.id, { reason })
      .then(() => {
        kickSuccessful = true;
      })
      .catch((err) => {
        interaction.reply({ content: "I cannot kick this member!" });
      });

    if (kickSuccessful) {
      await kickUser.send({ embeds: [dmEmbed] }).catch((err) => {
        try {
          interaction.channel.send("I couldn't DM the kicked user.");
        } catch (err) {
          interaction.guild.channels.cache
            .get("915568009815416845")
            .send("I couldn't DM the kicked user.");
        }
      });
      await interaction.reply({ embeds: [embed] });

      try {
        interaction.guild.channels.cache
          .get("1018289802065485826")
          .send({ embeds: [embed] });
      } catch (err) {
        interaction.guild.channels.cache
          .get("915568009815416845")
          .send({ embeds: [embed] });
      }
    }
  },
};
