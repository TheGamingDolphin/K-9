const { SlashCommandBuilder } = require("discord.js");

var happyArray = [
  "./assets/reaction/happy/maliciousLaughter.jpg",
  "./assets/reaction/happy/11ThumbsUp.jpg",
  "./assets/reaction/happy/10Happy.jpg",
];
var sadArray = [
  "./assets/reaction/sad/masterCry.jpg",
  "./assets/reaction/sad/13Sad.jpg",
  "./assets/reaction/sad/10Sad.png",
  "./assets/reaction/sad/11Sad.jpg",
  "./assets/reaction/sad/JackieSad.jpg",
];
var shockedArray = [
  "./assets/reaction/shocked/10Uhhh.jpg",
  "./assets/reaction/shocked/9RoseShock.jpg",
  "./assets/reaction/shocked/10Shock.jpg",
  "./assets/reaction/shocked/liveDalekSecReaction.jpg",
  "./assets/reaction/shocked/TW CoE reaction.jpg",
];
var excitedArray = [
  "./assets/reaction/excited/JackieAAAAAAA.jpg",
  "./assets/reaction/excited/10Laugh.jpg",
  "./assets/reaction/excited/10RoseLetsGo.jpg",
  "./assets/reaction/excited/DonnaHappy.jpg",
];
var wtfArray = [
  "./assets/reaction/wtf/10Disgust.jpg",
  "./assets/reaction/wtf/6Point.jpg",
  "./assets/reaction/wtf/AngelTurn.jpg",
  "./assets/reaction/wtf/DalekPOV.jpg",
  "./assets/reaction/wtf/13DontSeeIt.jpg",
  "./assets/reaction/wtf/11What.jpg",
  "./assets/reaction/wtf/11Wtf.jpg",
  "./assets/reaction/wtf/SlitheenHuh.jpg",
];
var boredArray = [
  "./assets/reaction/bored/10Write.jpg",
  "./assets/reaction/bored/10Sit.jpg",
  "./assets/reaction/bored/10Sip.jpg",
  "./assets/reaction/bored/10Sip2.jpg",
];
var angryArray = [
  "./assets/reaction/angry/RomanaAngry.jpg",
  "./assets/reaction/angry/1Gun.jpg",
  "./assets/reaction/angry/NyssaGun.jpg",
  "./assets/reaction/angry/MasterNotFunny.jpg",
  "./assets/reaction/angry/12Angry.jpg",
  "./assets/reaction/angry/10Yell.jpg",
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
      const randomImage = happyArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_sad") {
      var randomNumber = Math.floor(Math.random() * sadArray.length);
      const randomImage = sadArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_shocked") {
      var randomNumber = Math.floor(Math.random() * shockedArray.length);
      const randomImage = shockedArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_excited") {
      var randomNumber = Math.floor(Math.random() * excitedArray.length);
      const randomImage = excitedArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_wtf") {
      var randomNumber = Math.floor(Math.random() * wtfArray.length);
      const randomImage = wtfArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_bored") {
      var randomNumber = Math.floor(Math.random() * boredArray.length);
      const randomImage = boredArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    } else if (category === "image_angry") {
      var randomNumber = Math.floor(Math.random() * angryArray.length);
      const randomImage = angryArray[randomNumber];
      await interaction.reply({ files: [randomImage] });
    }
  },
};
