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
    await interaction.deferReply();
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const banUser = interaction.client.users.cache.get(ID);

    if (!interaction.member.permissions.has("BanMembers"))
      return await interaction.editReply({
        content: "You don't have ban perms. You can't exterminate others.",
      });
    if (interaction.member.id === ID)
      return await interaction.editReply({
        content: "You cannot ban yourself... <:Stare:1018284506941235200>",
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";

    const dmEmbed = new EmbedBuilder()
      .setColor("#85241d")
      .setTitle("Click here for appeal form!")
      .setURL("https://k-9.vercel.app/Appeal.html")
      .setThumbnail("attachment://dog.png")
      .addFields({
        name: `You have been banned from ${interaction.guild.name}`,
        value: `Reason: ${reason}\nYou can still appeal your ban! Just click the link above!`,
      })
      .setImage("attachment://BOTI_logo.png")
      .setTimestamp()
      .setFooter({
        text: "Safe travels!",
      });

    const embed = new EmbedBuilder()
      .setColor("#85241d")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${banUser} has been banned.\nReason: ${reason}\n\nID: ${
          interaction.options.getUser("user").id
        }`
      );

    await banUser
      .send({
        embeds: [dmEmbed],
        files: ["./assets/dog.png", "./assets/BOTI_logo.png"],
      })
      .catch((err) => {
        try {
          interaction.channel.send("I couldn't DM the banned user.");
        } catch (err) {
          interaction.guild.channels.cache
            .get("915568009815416845")
            .send("I couldn't DM the banned user.");
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
    await interaction.guild.bans
      .create(banUser.id, { reason })
      .then(() => {
        banSuccessful = true;
      })
      .catch((err) => {
        interaction.editReply({
          content:
            "I cannot ban this member!\nIf this is unexpected, please ban the member with a different bot and then report this issue on the [support page](https://k-9.vercel.app/Support.html)",
        });
      });
  },
};
