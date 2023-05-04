const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("You will become like us.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to upgrade")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Get the mentioned user and role
    const member = interaction.options.getMember("user");
    const role = interaction.guild.roles.cache.find(
      (role) => role.name === "Cybermen"
    );

    // Check if the role exists and its ID matches the desired role ID
    if (role && role.id === "1018260927948259358") {
      // Check if the member does not have the role
      if (!member.roles.cache.has(role.id)) {
        // Give the mentioned role to the mentioned user
        member.roles
          .add(role)
          .then(() => {
            interaction.reply(
              `Upgrade complete. ${member.user.tag} is now a cyberman. (for 1 hour)`
            );

            // Remove the role after 1 hour
            setTimeout(() => {
              member.roles
                .remove(role)
                .then(() => {
                  console.log(
                    `Successfully removed ${role.name} role from ${member.user.tag} after 1 hour.`
                  );
                })
                .catch((error) => {
                  console.error(error);
                  console.log(
                    `There was an error while removing the role from ${member.user.tag} after 1 hour.`
                  );
                });
            }, 3600000); // 1 hour in milliseconds
          })
          .catch((error) => {
            console.error(error);
            interaction.reply("There was an error while upgrading.");
          });
      } else {
        await interaction.reply(`${member.user.tag} is already a Cyberman`);
      }
    } else {
      await interaction.reply(
        `Sorry, upgrading is not available for this server.`
      );
    }
  },
};
