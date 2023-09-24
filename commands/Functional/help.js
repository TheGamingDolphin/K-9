const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help with K-9")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Want help with a specific command?")
        .addChoices(
          { name: "fun", value: "fun" },
          { name: "functional", value: "functional" },
          { name: "moderation", value: "moderation" },
          { name: "booster", value: "booster" }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const command = interaction.options.getString("command");
    // fun commands
    if (command === "fun") {
      await interaction.editReply(
        "Here are all the fun commands:\n`/60th`: Shows how many days left until the 60th anniversary of Doctor Who\n`/affirmative`: Replies with a video of K-9 saying 'Affirmative!' (in the style of the tbh creature)\n`/punch`: Punches the wall from Heaven Sent. You get a special role at 3000 punches!\n`/reaction`: Get a reaction image from the category you specify.\n`/regenerate`: Sends a random regeneration gif. Also changes your nickname to that Doctor.\n`/reversepolarity`: If you don't know what this one does, go try it :)\n`/trailer`: Sends youtube links to the trailers for future content.\n`/upgrade`: Gives the member you choose the Cyberman role for 1 hour. The role is cosmetic only.\n`/vortex`: Sends the time vortex video for the server!\n`/doctor09`: If you want orders..."
      );
    }
    //function commands
    else if (command === "functional") {
      await interaction.editReply(
        "Here are all the functional commands:\n`/avatar`: Replies with the bot's avatar (the world's finest art)\n`/help`: Get help with the bot, or select a command category to get help with that.\n`/ping`: Replies with the bot's latency and the current uptime.\n`/reload`: Reloads the bot (Developer only)\n`/source`: Sends the specified file from K-9's source code\n"
      );
    } else if (command === "moderation") {
      await interaction.editReply(
        "Here are all the moderation commands:\n`/exterminate`: Bans a member.\n`/delete`: Kicks a member.\n`/silence`: Mutes a member.\n`/blink`: Warns a member. Member is banned after 3 strikes.\n`/note`: Adds a note to a message."
      );
    } else if (command === "booster") {
      await interaction.editReply(
        "Here are all the booster exclusive commands:\n`companion`: Sends a gif of a random companion. Also changes your username to that companion."
      );
    }
    //
    else {
      await interaction.editReply(
        "To speak to K-9, start your message with `K-9`\nYou can run this again with the name of anothe command afterwards to get help with it!\n__Links__:\n[K-9 website](https://k-9.cool-epicepic.repl.co/)\n[K-9 testing server](https://discord.gg/xwMWhNHMd8)"
      );
    }
  },
};
