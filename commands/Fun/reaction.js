const { SlashCommandBuilder } = require("discord.js");

var happyArray = [
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105529916495237252/20230131_165035.jpg`,
  `https://nerdreactor.com/wp-content/uploads/2014/05/doctor-who-tenth-cubicle.jpg`,
  `https://cultbox.co.uk/wp-content/uploads/2014/05/Doctor-Who-Pandorica-Opens-Doctor-thumbs-up.jpg`,
  `https://www.themarysue.com/wp-content/uploads/2014/12/DoctorWhoTennantHappy.jpg?fit=1280%2C720`,
];
var sadArray = [
  `https://media.discordapp.net/attachments/1018199943774732410/1105528254602944542/fc8c00437c51c70f4cd24b460de47958.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545757089615912/3b752cfb04911c33a9147a59ec636517.jpg?width=712&height=702`,
  `https://cdn.discordapp.com/attachments/1105527309638828041/1105552731978072144/l-intro-1652988476.png`,
  `https://images.immediate.co.uk/production/volatile/sites/3/2016/01/98349.jpg?quality=90&resize=620,414`,
  `https://pbs.twimg.com/media/FuznoUtWYAQhvNU?format=jpg&name=small`,
];
var shockedArray = [
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105527884241702922/487332c99d94662632c4d764652784f7.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545737846145194/13eac4a313969b541286c09838173cc7.jpg`,
  `https://i.pinimg.com/736x/6c/19/dd/6c19dda83f8920d94a36a6d4a10326b0.jpg`,
  `https://cdn.discordapp.com/attachments/915568009815416845/1106725050360541204/20230509_142102.jpg`,
];
var excitedArray = [
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105527883214110840/a5bbda2696e3bb669728be07210cabb1.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105527883444785222/724576b8b6ae4d7790bbf84018916c3a.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545735367307396/434189f292003113af30c967e0a764ed.jpg`,
  `https://www.doctorwhotv.co.uk/wp-content/uploads/donna-tate-partners-in-crime.jpg`,
];
var wtfArray = [
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105527883893587968/7a972e60846d1358bfd73faedf198be1.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105529916235194449/20230131_225438.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105531839445217400/The-Time-of-Weeping-Angels.jpg`,
  `https://media.discordapp.net/attachments/1018199943774732410/1105527882975023194/588edf629120ceedddfa621d750c34b1.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545757643259914/748d9cd4d955acff96cac074ab8ed998.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545736155836426/866aaee873fc1c174614968e7fdb78f6.jpg`,
  `https://images.theabcdn.com/i/37731521`,
  `https://pbs.twimg.com/media/FuZMeEMWAAEOwtj?format=jpg&name=small`,
];
var boredArray = [
  `https://media.discordapp.net/attachments/1064766850438795295/1105545736797573180/7e0b1ce87ab3b6dcf58cef9e99a0c1a4.jpg`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545737086971974/aeaf32bedfce181e80a3e3d7c1a9f5e5.jpg?width=702&height=702`,
  `https://media.discordapp.net/attachments/1064766850438795295/1105545757362225162/ffec5ec2a85d30e5c23591f3adc84a44.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105528254145769613/83f186f8ab9af2b40d7a4538bce3f729.jpg`,
];
var angryArray = [
  `https://cdn.discordapp.com/attachments/239170784201801728/1088090319096119327/20230317_220802.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105529917069861025/20230202_101043.jpg`,
  `https://cdn.discordapp.com/attachments/1018199943774732410/1105529916793040927/20230101_195633.jpg`,
  `https://pataques.ovh/face.jpg`,
  `https://i.ytimg.com/vi/6yak3ujqxDw/maxresdefault.jpg`,
  `https://cdn3.whatculture.com/images/2015/01/doctor-who-angry-600x338.jpg`,
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reaction")
    .setDescription("Get a random reaction image!")

    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("Please send more images to @Beep the Meep#5809")
        .setRequired(true)
        .addChoices(
          { name: "Happy", value: "image_happy" },
          { name: "Sad", value: "image_sad" },
          { name: "Shocked", value: "image_shocked" },
          { name: "Excited", value: "image_excited" },
          { name: "wtf", value: "image_wtf" },
          { name: "Bored", value: "image_bored" },
          { name: "Angry", value: "image_angry" }
        )
    ),
  async execute(interaction) {
    const category = interaction.options.getString("category");
    if (category === "image_happy") {
      var randomNumber = Math.floor(Math.random() * happyArray.length);
      await interaction.reply(happyArray[randomNumber]);
    } else if (category === "image_sad") {
      var randomNumber = Math.floor(Math.random() * sadArray.length);
      await interaction.reply(sadArray[randomNumber]);
    } else if (category === "image_shocked") {
      var randomNumber = Math.floor(Math.random() * shockedArray.length);
      await interaction.reply(shockedArray[randomNumber]);
    } else if (category === "image_excited") {
      var randomNumber = Math.floor(Math.random() * excitedArray.length);
      await interaction.reply(excitedArray[randomNumber]);
    } else if (category === "image_wtf") {
      var randomNumber = Math.floor(Math.random() * wtfArray.length);
      await interaction.reply(wtfArray[randomNumber]);
    } else if (category === "image_bored") {
      var randomNumber = Math.floor(Math.random() * boredArray.length);
      await interaction.reply(boredArray[randomNumber]);
    } else if (category === "image_angry") {
      var randomNumber = Math.floor(Math.random() * angryArray.length);
      await interaction.reply(angryArray[randomNumber]);
    }
  },
};
