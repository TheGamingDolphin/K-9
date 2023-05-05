const { SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punch")
    .setDescription("How many seconds in eternity?"),
  async execute(interaction) {
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
      if (newScore >= 100 && newScore <= 249) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. How many seconds in eternity? And the shepherd's boy`
        );
      } else if (newScore >= 250 && newScore <= 499) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. And the shepherd's boy says`
        );
      } else if (newScore >= 500 && newScore <= 749) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. And the shepherd's boy says, there's this mountain of pure diamond. It takes an hour to climb it, and an hour to go around it!`
        );
      } else if (newScore >= 750 && newScore <= 999) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. Every hundred years, a little bird comes and sharpens its beak on the diamond mountain.`
        );
      } else if (newScore >= 1000 && newScore <= 1499) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. And when the entire mountain is chiselled away, the first second of eternity will have passed!`
        );
      } else if (newScore >= 1500 && newScore <= 1999) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. You must think that's a hell of a long time,`
        );
      } else if (newScore >= 2000 && newScore <= 2999) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. Personally, I think that's a hell of a`
        );
      } else if (newScore === 3000) {
        await interaction.reply(
          `<@${userID}> has broken the wall!\n Personally, I think that's a hell of a bird.`
        );
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
            `Sorry, there is no reward for breaking the wall in this server.`
          );
        }
      } else if (newScore > 3000) {
        await interaction.reply(
          `You have already broken the wall <@${userID}>, there's nothing to punch`
        );
      } else if (newScore >= 1 && newScore <= 99) {
        await interaction.reply(
          `<@${userID}> has punched the wall ${newScore} times. There's this emperor and he asks this shepherd's boy, how many seconds in eternity?`
        );
      }
    } else {
      // if the userID doesn't exist, add a new line with score 1
      const newLine = `${userID},1\n`;
      const updatedContents = `${fileContents}${newLine}`;
      fs.writeFileSync("streak.txt", updatedContents, "utf-8");
      await interaction.reply(
        `<@${userID}> has punched the wall for the first time. This might take me a little while, so do you want me to tell you a story?`
      );
    }
  },
};
