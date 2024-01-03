// const {
//   SlashCommandBuilder,
//   ActionRowBuilder,
//   ModalBuilder,
//   TextInputBuilder,
//   TextInputStyle,
//   ButtonBuilder,
//   ButtonStyle,
// } = require("discord.js");
// const fs = require("node:fs");

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName("snowman")
//     .setDescription("Build a snowman!"),
//   async execute(interaction) {
//     //check if snowman exists
//     const fileContents = fs.readFileSync("./snowman/snowmen.txt", "utf-8");
//     var userID = interaction.user.id;
//     const line = fileContents
//       .split("\n")
//       .find((l) => l.startsWith(userID + ","));

//     if (!line) {
//       // if there is no user ID, get the user to name a snowman
//       // Create the modal
//       const modal = new ModalBuilder()
//         .setCustomId("snowmanBuilder")
//         .setTitle("Snowman Builder");
//       // Create the text input components
//       const snowmanInput = new TextInputBuilder()
//         .setCustomId("snowmanInput")
//         .setLabel("What do you want to name your snowman?")
//         .setStyle(TextInputStyle.Short)
//         // set the maximum number of characters to allow
//         .setMaxLength(20)
//         // set the minimum number of characters required for submission
//         .setMinLength(1)
//         // set a placeholder string to prompt the user
//         .setPlaceholder("Frosty")
//         // require a value in this input field
//         .setRequired(true);

//       const firstActionRow = new ActionRowBuilder().addComponents(snowmanInput);
//       modal.addComponents(firstActionRow);

//       // Show the modal to the user
//       await interaction.showModal(modal);
//       const submitted = await interaction
//         .awaitModalSubmit({
//           // Timeout after a minute of not receiving any valid Modals
//           time: 60000,
//           // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
//           filter: (i) => i.user.id === interaction.user.id,
//         })
//         .catch((error) => {
//           // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
//           console.error(error);
//           return null;
//         });
//       if (submitted) {
//         const snowmanName = submitted.fields.fields.first().value;
//         if (snowmanName) {
//           if (snowmanName.includes("@")) {
//             await submitted.reply({
//               content: `You cannot have an @ in the name of your snowman!`,
//             });
//           } else {
//             await submitted.reply({
//               content: `You started building a snowman! You called it "${snowmanName}"! :D`,
//             });
//             const grinning = new ButtonBuilder()
//               .setCustomId("grinning")
//               .setLabel("😀")
//               .setStyle(ButtonStyle.Secondary);
//             const nerd = new ButtonBuilder()
//               .setCustomId("nerd")
//               .setLabel("🤓")
//               .setStyle(ButtonStyle.Secondary);
//             const sunglasses = new ButtonBuilder()
//               .setCustomId("sunglasses")
//               .setLabel("😎")
//               .setStyle(ButtonStyle.Secondary);
//             const pleading_face = new ButtonBuilder()
//               .setCustomId("pleading_face")
//               .setLabel("🥺")
//               .setStyle(ButtonStyle.Secondary);
//             const cry = new ButtonBuilder()
//               .setCustomId("cry")
//               .setLabel("😢")
//               .setStyle(ButtonStyle.Secondary);
//             const row = new ActionRowBuilder().addComponents(
//               grinning,
//               nerd,
//               sunglasses,
//               pleading_face,
//               cry
//             );
//             // Sending a message with buttons
//             const response = await interaction.channel.send({
//               content: "Pick a head for your snowman!",
//               components: [row],
//             });
//             const collectorFilter = (i) => i.user.id === interaction.user.id;

//             const confirmation = await response.awaitMessageComponent({
//               filter: collectorFilter,
//               time: 60000,
//             });
//             if (confirmation.customId === "grinning") {
//               await confirmation.update({
//                 content: `You picked the 😀 head!`,
//                 components: [],
//               });
//             } else if (confirmation.customId === "nerd") {
//               await confirmation.update({
//                 content: `You picked the 🤓 head!`,
//                 components: [],
//               });
//             } else if (confirmation.customId === "sunglasses") {
//               await confirmation.update({
//                 content: `You picked the 😎 head!`,
//                 components: [],
//               });
//             } else if (confirmation.customId === "pleading_face") {
//               await confirmation.update({
//                 content: `You picked the 🥺 head!`,
//                 components: [],
//               });
//             } else if (confirmation.customId === "cry") {
//               await confirmation.update({
//                 content: `You picked the 😢 head!`,
//                 components: [],
//               });
//             }
//             let currentDate = new Date();
//             const newLine = `${userID},${snowmanName},${confirmation.customId},1,${currentDate}\n`;
//             const updatedContents = `${fileContents}${newLine}`;
//             fs.writeFileSync("./snowman/snowmen.txt", updatedContents, "utf-8");
//           }
//         } else {
//           console.error("Snowman name is undefined");
//         }
//       }
//     } else {
//       const [user, snowman, emoji, height, date] = line.split(",");
//       //calculate how many emojis tall the snowman is
//       const emojis = parseInt(height, 10);
//       const emojiLines = Array.from({ length: emojis }, () => `:white_circle:`);
//       //calculate date
//       const storedDateString = date;
//       // Convert the stored date string to a Date object
//       const storedDateObject = new Date(storedDateString);
//       // Get the current date
//       const currentDate = new Date();
//       // Check if the day is the same
//       if (currentDate.getMonth() + 1 == "12") {
//         if (currentDate.getDate() === storedDateObject.getDate()) {
//           // The days are the same
//           await interaction.reply(
//             `You can only grow your snowman once per day!\n${snowman} is currently ${
//               height / 10
//             }m tall!⛄\n:${emoji}:\n${emojiLines.join("\n")}`
//           );
//         } else {
//           // The days are different
//           if (currentDate.getDate() == "25") {
//             var newHeight = parseInt(height, 10) + 10;
//           } else {
//             var newHeight = parseInt(height, 10) + 1;
//           }
//           const randomNumber = Math.floor(Math.random() * 99) + 1;
//           console.log(randomNumber);
//           if (randomNumber === 69) {
//             interaction.channel.send(
//               `[RARE EVENT] <@${user}>'s snowman, ${snowman}, has come to life :D\n${snowman} grew by 5 extra snow!`
//             );
//             interaction.channel.send(
//               "https://i.makeagif.com/media/11-24-2015/FyAHw-.gif"
//             );
//             newHeight = newHeight + 5;
//           } else if (randomNumber === 66) {
//             interaction.channel.send(
//               `<@${user}>'s snowman, ${snowman}, was possessed by the Great Intelligence!\n${snowman} was defeated, causing 5 snow to melt away :(`
//             );
//             interaction.channel.send("https://j.gifs.com/vnD2Xj.gif");
//             newHeight = newHeight - 5;
//           }
//           const newLine = `${user},${snowman},${emoji},${newHeight},${currentDate}`;
//           const updatedContents = fileContents.replace(line, newLine);
//           fs.writeFileSync("./snowman/snowmen.txt", updatedContents, "utf-8");
//           const newEmojis = parseInt(newHeight, 10);
//           const newEmojiLines = Array.from(
//             { length: newEmojis },
//             () => `:white_circle:`
//           );
//           await interaction.reply(
//             `You added snow to your snowman!\n${snowman} is now ${
//               newHeight / 10
//             }m tall!⛄\n:${emoji}:\n${newEmojiLines.join("\n")}`
//           );
//         }
//       } else {
//         await interaction.reply(
//           `December has ended, and ${snowman} has melted :(\nYour snowman was ${
//             height / 10
//           }m tall.`
//         );
//       }
//     }
//   },
// };
