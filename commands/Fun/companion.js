const { SlashCommandBuilder } = require("discord.js");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("companion")
    .setDescription("Become a random companion"),
  async execute(interaction) {
    await interaction.deferReply();
    const member = interaction.member;
    let canNickname = true;
    const randomNumber = Math.floor(Math.random() * 16) + 1;
    // Check if the member does not have the role
    if (
      !interaction.channel
        .permissionsFor(interaction.client.user)
        .has("ManageNicknames")
    ) {
      canNickname = false;
    } else if (!interaction.member.manageable) {
      // The above if statement determines whether the client user is above the member
      // who ran the command in the hierarchy, according to role position and guild ownership.
      canNickname = false;
    }
    if (randomNumber === 1) {
      await interaction.editReply({
        files: ["./assets/companion/rose-tyler.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Rose Tyler (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Rose Tyler").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 2) {
      await interaction.editReply({
        files: ["./assets/companion/martha-jones.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Martha Jones (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Martha Jones").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 3) {
      await interaction.editReply({
        files: ["./assets/companion/donna-noble.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Donna Noble (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Donna Noble").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 4) {
      await interaction.editReply({
        files: ["./assets/companion/amy-pond.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Amy Pond (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Amy Pond").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 5) {
      await interaction.editReply({
        files: ["./assets/companion/rory-williams.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Rory Williams (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Rory Williams").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 6) {
      await interaction.editReply({
        files: ["./assets/companion/clara-oswald.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Clara Oswald (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Clara Oswald").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 7) {
      await interaction.editReply({
        files: ["./assets/companion/bill-potts.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Bill Potts (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Bill Potts").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 8) {
      await interaction.editReply({
        files: ["./assets/companion/nardole.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Nardole (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Nardole").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 9) {
      await interaction.editReply({
        files: ["./assets/companion/yasmin-khan.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Yasmin Khan (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Yasmin Khan").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 10) {
      await interaction.editReply({
        files: ["./assets/companion/graham-obrien.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Graham O'Brien (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Graham O'Brien").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 11) {
      await interaction.editReply({
        files: ["./assets/companion/ryan-sinclair.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Ryan Sinclair (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Ryan Sinclair").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 12) {
      await interaction.editReply({
        files: ["./assets/companion/dan-lewis.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Dan Lewis (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Dan Lewis").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 13) {
      await interaction.editReply({
        files: ["./assets/companion/river-song.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `River Song (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("River Song").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 14) {
      await interaction.editReply({
        files: ["./assets/companion/jack-harkness.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Jack Harkness (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Jack Harkness").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 15) {
      await interaction.editReply({
        files: ["./assets/companion/sarah-jane.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Sarah Jane Smith (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Sarah Jane Smith").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 16) {
      await interaction.editReply({
        files: ["./assets/companion/jackie-tyler.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `Jackie Tyler (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Jackie Tyler").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    }
  },
};
