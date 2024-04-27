const { SlashCommandBuilder } = require("discord.js");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spin")
    .setDescription("K-9 will spin!"),
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
    await interaction.editReply(
      "https://cdn.discordapp.com/attachments/1233867210896707665/1233867684798529636/spin.gif?ex=662ea854&is=662d56d4&hm=36956fa9eb723e1d5cf990c664ea35eb75530f9a48fe9a7c1166d3af3726d13b&"
    );
  },
};
