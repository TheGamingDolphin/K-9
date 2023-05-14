const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("exterminate")
    .setDescription("[MODERATOR ONLY] Ban a member. EXTERMINATE, EXTERMINATE!!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to exterminate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(`The reason for banning the member`)
    ),
  async execute(interaction) {
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const banUser = interaction.client.users.cache.get(ID);

    if (!interaction.member.permissions.has("BanMembers"))
      return await interaction.reply({
        content: "You don't have ban perms. You can't exterminate others.",
      });
    if (interaction.member.id === ID)
      return await interaction.reply({
        content: "You cannot ban yourself... <:Stare:1018284506941235200>",
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";

    const dmEmbed = new EmbedBuilder()
      .setColor("#003b6f")
      .setTitle("Click here for appeal form!")
      .setURL("https://k-9.cool-epicepic.repl.co/Appeal.html")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/915568009815416845/1103682438187724851/New_Project.png"
      )
      .addFields({
        name: `You have been banned from ${interaction.guild.name}`,
        value: `Reason: ${reason}\nYou can still appeal your ban! Just click the link above!`,
      })
      .setImage(
        "https://cdn.discordapp.com/attachments/1018266915409514608/1018486366843191457/New_Project_73.png"
      )
      .setTimestamp()
      .setFooter({
        text: "Safe travels!",
      });

    const embed = new EmbedBuilder()
      .setColor("#003b6f")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${banUser.tag} has been banned.\nReason: ${reason}`
      );

    let banSuccessful = false;

    await interaction.guild.bans
      .create(banUser.id, { reason })
      .then(() => {
        banSuccessful = true;
      })
      .catch((err) => {
        interaction.reply({ content: "I cannot ban this member!" });
      });

    if (banSuccessful) {
      await banUser.send({ embeds: [dmEmbed] }).catch((err) => {
        console.log("Failed to send DM");
      });
      await interaction.reply({ embeds: [embed] });

      try {
        interaction.guild.channels.cache
          .get("1018289802065485826")
          .send({ embeds: [embed] });
      } catch (err) {
        console.log("No channel found");
      }
    }
  },
};
