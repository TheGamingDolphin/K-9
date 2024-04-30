const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wheretostart")
    .setDescription("New to the show but don't know where to begin? Here's some starting points!"),
  async execute(interaction) {
    await interaction.deferReply();

    // Function to handle button clicks
    const buttonHandler = async (interaction) => {
      const buttonId = interaction.customId;
      let message;
      switch (buttonId) {
        case 'UnearthlyChild':
          message = 'Want to watch the entire show from the beginning? Start here! It will take a long time to catch up, and a lot of the early black and white episodes are missing, but if you have the attention span then go for it!';
          break;
        case 'SpearheadFromSpace':
          message = "Don't want to watch the black and white stuff with many missing episodes? Start here!\nAfter being forced to change his face by his own species, the Time Lords, the Doctor is exiled to Earth and is stripped of the ability to use his TARDIS, trapping him there. The Doctor works with UNIT, a military organisation created to combat the extraterrestrial in order to prevent an alien invasion.";
          break;
        case 'Robot':
          message = 'Want stories set in space and on other planets? Start here! The Doctor, freshly regenerated and able to use his TARDIS, travels from human colonies in space to the planet Skaro, the home planet of the Daleks!';
          break;
        case 'TVMovie':
          message = "Want to skip the classic era but don't to skip straight onto the revival era? Watch this movie! This movie follows the Doctor as he tries to prevent his arch nemesis, The Master, from destroying the world.";
          break;
        case 'Rose':
          message = "This is a great place to begin. After the show's cancellation in 1989, it was revived in 2005 with a new Doctor and designed for a new era. A lot more fast paced than the classic era of the show, Rose Tyler meets a mysterious man caled the Doctor";
          break;
        case 'EleventhHour':
          message = 'The Eleventh Hour was the first episode written by Steven Moffat as showrunner, and requires no prior knowledge of the show. The Doctor crash lands in the garden of Amelia Pond, and finds a mysterious crack in her bedroom wall';
          break;
        case 'Pilot':
          message = 'This episode is designed to introduce new viewers to the show. The Doctor meets Bill Potts while teaching at a university, and takes her on as his private student. However, everything changes when an alien threat leads to a chase across time and space.';
          break;
        case 'WomanWhoFellToEarth':
          message = 'The Woman Who Fell to Earth was the first episode written by Chris Chibnall as showrunner. A group of people encounter the Doctor on a train, and join her in an effort to stop an alien hunt';
          break;
        case 'ChurchOnRubyRoad':
          message = 'This episode introduces both the 15th Doctor and Ruby Sunday. This episode takes place on Christmas Eve, but evil forces are at work.';
          break;
        case 'SpaceBabies':
          message = 'The first episode of series 14! Starting at the beginning of the new series? Enjoy it :D and if you want to go back and watch some of the older show afterwards, come back to this list!';
          break;
        default:
          message = 'Unknown button clicked.';
          break;
      }
      await interaction.reply({ content: message, ephemeral: true });
    };

    // Function to create buttons and action row
    const createButtons = (buttons) => {
      const row = new ActionRowBuilder();
      buttons.forEach(button => {
        row.addComponents(button);
      });
      return row;
    };

    // Create first set of buttons
    const firstButtons = [
      new ButtonBuilder().setCustomId("UnearthlyChild").setEmoji("<:Doctor01:1234958347057496096>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("SpearheadFromSpace").setEmoji("<:Doctor03:1234959424091590667>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("Robot").setEmoji("<:Doctor04:1234959435357622285>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("TVMovie").setEmoji("<:Doctor08:1234959445138739353>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("Rose").setEmoji("<:Doctor09:1179920908928962611>").setStyle(ButtonStyle.Secondary)
    ];

    // Create second set of buttons
    const secondButtons = [
      new ButtonBuilder().setCustomId("EleventhHour").setEmoji("<:Doctor11:1234959468610191400>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("Pilot").setEmoji("<:Doctor12:1234959481604018217>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("WomanWhoFellToEarth").setEmoji("<:Doctor13:1234959490390949979>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("ChurchOnRubyRoad").setEmoji("<:Doctor15:1234959504743993405>").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId("SpaceBabies").setEmoji("<:Doctor15:1234962378458660914>").setStyle(ButtonStyle.Secondary)
    ];

    // Create an embed with bullet points for the buttons
    const embed = new EmbedBuilder()
    .setColor("#003B6F")
    .setTitle("New to Who? Here's some starting points!")
    .addFields({
      name: `<:Doctor01:1234958347057496096> An Unearthly Child`,
      value: `The very first Doctor Who episode from 1963!\n1st Doctor: William Hartnell\nYear: 1963`,
    })
    .addFields({
        name: `<:Doctor03:1234959424091590667> Spearhead from Space`,
        value: `The first colourised episode of Doctor Who!\n3rd Doctor: Jon Pertwee\nYear: 1970`,
      })
      .addFields({
        name: `<:Doctor04:1234959435357622285> Robot`,
        value: `The debut adventure for the longest-running Doctor!\n4th Doctor: Tom Baker\nYear: 1974`,
      })
      .addFields({
        name: `<:Doctor08:1234959445138739353> The TV Movie`,
        value: `American produced movie released while the show was off air!\n8th Doctor: Paul McGann\nYear: 1996`,
      })
      .addFields({
        name: `<:Doctor09:1179920908928962611> Rose`,
        value: `The first episode of the revival era!\n9th Doctor: Christopher Eccleston\nYear: 2005`,
      })
      .addFields({
        name: `<:Doctor11:1234959468610191400> The Eleventh Hour`,
        value: `Second showrunner of the revival era!\n11th Doctor: Matt Smith\nYear: 2010`,
      })
      .addFields({
        name: `<:Doctor12:1234959481604018217> The Pilot`,
        value: `This episode is designed to be a jumping on point!\n12th Doctor: Peter Capaldi\nYear: 2017`,
      })
      .addFields({
        name: `<:Doctor13:1234959490390949979> The Woman Who Fell to Earth`,
        value: `Third showrunner of the revival era and first female Doctor!\n13th Doctor: Jodie Whittaker\nYear: 2018`,
      })
      .addFields({
        name: `<:Doctor15:1234959504743993405> The Church on Ruby Road`,
        value: `Christmas special for the new series, introduces the new Doctor and the new companion!\n15th Doctor: Ncuti Gatwa\nYear: 2023`,
      })
      .addFields({
        name: `<:Doctor15:1234962378458660914> Space Babies`,
        value: `Episode 1 of the new series!\n15th Doctor: Ncuti Gatwa\nYear: 2024`,
      })
      .setFooter({
        text: "Click a button to get more info!",
      });
    
    // Sending the initial message with both sets of buttons in an embed
    await interaction.editReply({
        embeds: [embed],
      components: [createButtons(firstButtons), createButtons(secondButtons)]
    });

    // Listen for button clicks continuously
    const collector = interaction.channel.createMessageComponentCollector({ time: null });

    collector.on('collect', async (interaction) => {
      await buttonHandler(interaction);
    });

    // Handle collector errors
    collector.on('end', () => {
      console.log('Button collector ended.');
    });
  },
};
