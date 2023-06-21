const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punch")
    .setDescription("How many seconds in eternity?"),
  async execute(interaction) {
    //cooldown
    const now = Date.now();
    const cooldownAmount = 5 * 1000;

    if (cooldowns.has(interaction.user.id)) {
      const expirationTime =
        cooldowns.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply(
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before using the \`${
            interaction.commandName
          }\` command again.`,
          { ephemeral: true }
        );
      }
    }

    cooldowns.set(interaction.user.id, now);
    setTimeout(() => cooldowns.delete(interaction.user.id), cooldownAmount);
    // cooldown section ends here
    await interaction.deferReply();
    // read the contents of the 'streak.txt' file
    const fileContents = fs.readFileSync("streak.txt", "utf-8");
    const member = interaction.member;
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Four and a half billion years"
    );
    var userID = interaction.user.id;
    // find the line in the file that contains the userID and score
    const line = fileContents
      .split("\n")
      .find((l) => l.startsWith(userID + ","));

    if (line) {
      // if the userID exists, increment the score by 1
      const [, score] = line.split(",");
      const newScore = parseInt(score, 10) + 1;
      const newLine = `${userID},${newScore}`;
      const updatedContents = fileContents.replace(line, newLine);
      fs.writeFileSync("streak.txt", updatedContents, "utf-8");
      try {
        if (newScore >= 250 && newScore <= 499) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. How many seconds in eternity? And the shepherd's boy`,
            files: ["./assets/punch/250.gif"],
          });
        } else if (newScore >= 500 && newScore <= 749) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. And the shepherd's boy says`,
            files: ["./assets/punch/500.gif"],
          });
        } else if (newScore >= 750 && newScore <= 999) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. And the shepherd's boy says, there's this mountain of pure diamond. It takes an hour to climb it, and an hour to go around it!`,
            files: ["./assets/punch/750.gif"],
          });
        } else if (newScore >= 1000 && newScore <= 1499) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. Every hundred years, a little bird comes and sharpens its beak on the diamond mountain.`,
            files: ["./assets/punch/1000.gif"],
          });
        } else if (newScore >= 1500 && newScore <= 1999) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. And when the entire mountain is chiselled away, the first second of eternity will have passed!`,
            files: ["./assets/punch/1500.gif"],
          });
        } else if (newScore >= 2000 && newScore <= 2499) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. You must think that's a hell of a long time,`,
            files: ["./assets/punch/2000.gif"],
          });
        } else if (newScore >= 2500 && newScore <= 2999) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. Personally, I think that's a hell of a`,
            files: ["./assets/punch/2500.gif"],
          });
        } else if (newScore === 3000) {
          await interaction.editReply({
            content: `<@${userID}> has broken the wall!\n Personally, I think that's a hell of a bird.`,
            files: ["./assets/punch/End.mp4"],
          });
          // Check if the role exists and its ID matches the desired role ID
          if (role && role.id === "1104044177215471677") {
            // Check if the member does not have the role
            if (!member.roles.cache.has(role.id)) {
              // Give the mentioned role to the mentioned user
              member.roles.add(role).then(() => {
                interaction.channel.send(
                  `<@${userID}> has recieved the **Four and a half billion years** role!`
                );
              });
            } else {
              interaction.channel.send(`<@${userID}> already has the role.`);
            }
          } else {
            interaction.channel.send(
              `Sorry, there is no role found. Please report this issue on the [support page](https://k-9.cool-epicepic.repl.co/Support.html)`
            );
          }
        } else if (newScore > 3000) {
          await interaction.editReply(
            `You have already broken the wall <@${userID}>, there's nothing to punch`
          );
        } else if (newScore >= 1 && newScore <= 249) {
          await interaction.editReply({
            content: `<@${userID}> has punched the wall ${newScore} times. There's this emperor and he asks this shepherd's boy, how many seconds in eternity?`,
            files: ["./assets/punch/1.gif"],
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // if the userID doesn't exist, add a new line with score 1
      const newLine = `${userID},1\n`;
      const updatedContents = `${fileContents}${newLine}`;
      fs.writeFileSync("streak.txt", updatedContents, "utf-8");
      await interaction.editReply(
        `<@${userID}> has punched the wall for the first time. This might take me a little while, so do you want me to tell you a story?`,
        { files: ["./assets/punch/Start.gif"] }
      );
    }
  },
};
