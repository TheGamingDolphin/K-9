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
          { name: "60th", value: "fun_60th" },
          { name: "affirmative", value: "fun_affirmative" },
          { name: "punch", value: "fun_punch" },
          { name: "reaction", value: "fun_reaction" },
          { name: "regenerate", value: "fun_regenerate" },
          { name: "reversepolarity", value: "fun_reversepolarity" },
          { name: "spin", value: "fun_spin" },
          { name: "trailer", value: "fun_trailer" },
          { name: "upgrade", value: "fun_upgrade" },
          { name: "vortex", value: "fun_vortex" },
          { name: "avatar", value: "functional_avatar" },
          { name: "help", value: "functional_help" },
          { name: "patchnotes", value: "functional_patchnotes" },
          { name: "ping", value: "functional_ping" },
          { name: "exterminate", value: "moderation_exterminate" }
        )
    ),
  async execute(interaction) {
    const command = interaction.options.getString("command");
    if (command === "fun_60th") {
      await interaction.reply(
        "`/60th`: Shows how many days left until the 60th anniversary of Doctor Who"
      );
    } else if (command === "fun_affirmative") {
      await interaction.reply(
        "`/affirmative`: Replies with a video of K-9 saying 'Affirmative!' (in the style of the tbh creature)"
      );
    } else if (command === "fun_punch") {
      await interaction.reply(
        "`/punch`: Punches the wall from Heaven Sent. You get a special role at 10,000 punches!"
      );
    } else if (command === "fun_reaction") {
      await interaction.reply(
        "`/reaction`: Get a reaction image from the category you specify"
      );
    } else if (command === "fun_regenerate") {
      await interaction.reply(
        "`/regenerate`: Sends a random regeneration gif. Also changes your nickname to that Doctor (your original username will stay in brackets, provided it is short enough to fit)"
      );
    } else if (command === "fun_reversepolarity") {
      await interaction.reply(
        "`/reversepolarity`: If you don't know what this one does, go try it ;) (doesn't work for people with admin perms)"
      );
    } else if (command === "fun_spin") {
      await interaction.reply("`/spin`: Sends a gif of K-9 spinning");
    } else if (command === "fun_trailer") {
      await interaction.reply(
        "`/trailer`: Sends youtube links to the trailers for future content)"
      );
    } else if (command === "fun_upgrade") {
      await interaction.reply(
        "`/upgrade`: Gives the member you choose the Cyberman role for 1 hour. The role is cosmetic only."
      );
    } else if (command === "fun_vortex") {
      await interaction.reply(
        "`/vortex`: Sends the time vortex video for the server!"
      );
    } else if (command === "functional_avatar") {
      await interaction.reply(
        "`/avatar`: Replies with the bot's avatar (the world's finest art)"
      );
    } else if (command === "functional_help") {
      await interaction.reply(
        "`/help`: Get help with the bot, or select a command to get help with that (but you knew that, you're already here)"
      );
    } else if (command === "functional_patchnotes") {
      await interaction.reply(
        "`/patchnotes`: Replies with the latest patch notes for the bot, showing the newest features"
      );
    } else if (command === "functional_ping") {
      await interaction.reply(
        "`/ping`: Replies with the bot's latency and the current uptime (also logs some useful stuff, so you may see the developer using it a lot)"
      );
    } else if (command === "moderation_exterminate") {
      await interaction.reply(
        "`/exterminate`: Bans a member. Only works for moderators."
      );
    } else {
      await interaction.reply(
        "To speak to K-9, start your message with `K-9 ` (case sensitive, and the space afterwards is required)\nYou can run this again with the name of anothe command afterwards to get help with it!\n__Links__:\n[K-9 website](https://k-9.cool-epicepic.repl.co/) (If K-9 goes offline, visiting this website will start him again)\n[K-9 testing server](https://discord.gg/xwMWhNHMd8)"
      );
    }
  },
};
