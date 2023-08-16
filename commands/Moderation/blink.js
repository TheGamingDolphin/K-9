const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blink")
    .setDescription("[MODERATOR ONLY] Warn a member. Blink and you're dead.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The member to warn")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for warning the member")
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const users = interaction.options.getUser("user");
    const ID = users.id;
    const warnUser = interaction.client.users.cache.get(ID);

    const fileContents = fs.readFileSync("warns.txt", "utf-8");
    const line = fileContents.split("\n").find((l) => l.startsWith(ID + ","));

    let image = "angel1";
    let strikes = "1/3";
    let banStrike = false;

    if (line) {
      // if the userID exists, increment the warn by 1
      const [, warn] = line.split(",");
      const newWarn = parseInt(warn, 10) + 1;
      const newLine = `${ID},${newWarn}`;
      const updatedContents = fileContents.replace(line, newLine);
      fs.writeFileSync("warns.txt", updatedContents, "utf-8");
      if (newWarn == 3) {
        image = "angel3";
        strikes = "3/3";
        banStrike = true;
      } else if (newWarn == 2) {
        image = "angel2";
        strikes = "2/3";
        banStrike = false;
      }
    } else {
      // if the userID doesn't exist, add a new line with score 1
      const newLine = `${ID},1\n`;
      const updatedContents = `${fileContents}${newLine}`;
      fs.writeFileSync("warns.txt", updatedContents, "utf-8");
      banStrike = false;
    }

    if (!interaction.member.permissions.has("ModerateMembers"))
      return await interaction.editReply({
        content: "You don't have warn perms. You can't warn others.",
      });
    if (interaction.member.id === ID)
      return await interaction.editReply({
        content:
          "You cannot warn yourself... <a:WeepingAngel:1018280082655154396>",
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";
    const thumbnailAttachment = new AttachmentBuilder("./assets/dog.png");
    const imageAttachment = new AttachmentBuilder(`./assets/${image}.jpg`);

    const dmEmbed = new EmbedBuilder()
      .setColor("#e9f505")
      .setTitle("Click here to view the warn")
      .setURL(
        "https://discord.com/channels/1018199943330140170/1018289802065485826"
      )
      .setThumbnail(`attachment://dog.png`)
      .addFields({
        name: `You have been warned in ${interaction.guild.name}`,
        value: `Reason: ${reason}\nStrikes: ${strikes}`,
      })
      .setImage(`attachment://${image}.jpg`)
      .setTimestamp()
      .setFooter({
        text: "Please follow the rules.",
      });

    const embed = new EmbedBuilder()
      .setColor("#e9f505")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${warnUser} has been warned.\nReason: ${reason}\nStrikes: ${strikes}\n\nID: ${
          interaction.options.getUser("user").id
        }`
      );

    const banDmEmbed = new EmbedBuilder()
      .setColor("#85241d")
      .setTitle("Click here for appeal form!")
      .setURL("https://k-9.cool-epicepic.repl.co/Appeal.html")
      .setThumbnail("attachment://dog.png")
      .addFields({
        name: `You have been banned from ${interaction.guild.name}`,
        value: `Reason: 3 strikes\nYou can still appeal your ban! Just click the link above!`,
      })
      .setImage("attachment://BOTI_logo.png")
      .setTimestamp()
      .setFooter({
        text: "Safe travels!",
      });

    const banEmbed = new EmbedBuilder()
      .setColor("#85241d")
      .setDescription(
        `<:Affirmative:1019680728759419011> ${warnUser} has been banned.\nReason: 3 strikes\n\nID: ${
          interaction.options.getUser("user").id
        }`
      );

    await warnUser
      .send({
        embeds: [dmEmbed],
        files: [thumbnailAttachment, imageAttachment],
      })
      .catch((err) => {
        try {
          interaction.channel.send("I couldn't DM the warned user.");
        } catch (err) {
          interaction.guild.channels.cache
            .get("915568009815416845")
            .send("I couldn't DM the warned user.");
        }
      });
    await interaction.editReply({ embeds: [embed] });
    if (banStrike === true) {
      await warnUser
        .send({
          embeds: [banDmEmbed],
          files: ["./assets/dog.png", "./assets/BOTI_logo.png"],
        })
        .catch((err) => {
          console.log(err);
          try {
            interaction.channel.send("I couldn't DM the banned user.");
          } catch (err) {
            console.log(err);
            interaction.guild.channels.cache
              .get("915568009815416845")
              .send("I couldn't DM the banned user.");
          }
        });
      await interaction.channel.send({ embeds: [banEmbed] });
      try {
        interaction.guild.channels.cache
          .get("1018289802065485826")
          .send({ embeds: [banEmbed] });
      } catch (err) {
        interaction.guild.channels.cache
          .get("915568009815416845")
          .send({ embeds: [banEmbed] });
      }

      await interaction.guild.bans
        .create(warnUser.id, { reason })
        .then(() => {
          banSuccessful = true;
        })
        .catch((err) => {
          console.log(err);
          interaction.channel.send({
            content:
              "I cannot ban this member!\nIf this is unexpected, please ban the member with a different bot and then report this issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)",
          });
        });
    }

    try {
      interaction.guild.channels.cache
        .get("1018289802065485826")
        .send({ embeds: [embed] });
    } catch (err) {
      interaction.guild.channels.cache
        .get("915568009815416845")
        .send({ embeds: [embed] });
    }
  },
};
