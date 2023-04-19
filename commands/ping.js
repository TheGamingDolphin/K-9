import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('60th')
  .setDescription('How many days until the 60th?');

export async function execute(interaction) {
  let date_1 = new Date('11/23/2023');
  let date_2 = new Date();

  const days = (date_1, date_2) => {
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };
  await interaction.reply(days(date_1, date_2) + ' days until the 60th anniversary of Doctor Who!');
}
