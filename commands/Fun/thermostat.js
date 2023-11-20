const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("thermostat")
    .setDescription("Change the temperature in chat")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("Number to set to")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const number = interaction.options.getNumber("number");
    await interaction.editReply(`The server temperature is now ${number}°C`);
  },
};
