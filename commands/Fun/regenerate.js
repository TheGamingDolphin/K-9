const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("regenerate")
    .setDescription("Love from Gallifrey, boys!"),
  async execute(interaction) {
    const member = interaction.member.user.username;
    let canNickname = true;
    const randomNumber = Math.floor(Math.random() * 18) + 1;
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
    await interaction.deferReply();
    if (randomNumber === 1) {
      await interaction.editReply({ files: ["./assets/regeneration/1.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 2nd Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 2nd Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 2) {
      //2 to 3
      await interaction.editReply({ files: ["./assets/regeneration/2.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 3rd Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 3rd Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 3) {
      //3 to 4
      await interaction.editReply({ files: ["./assets/regeneration/3.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 4th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 4th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 4) {
      //4 to 5
      await interaction.editReply({ files: ["./assets/regeneration/4.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 5th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 5th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 5) {
      //5 to 6
      await interaction.editReply({ files: ["./assets/regeneration/5.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 6th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 6th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 6) {
      //6 to 7
      await interaction.editReply({ files: ["./assets/regeneration/6.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 7th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 7th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 7) {
      //7 to 8
      await interaction.editReply({ files: ["./assets/regeneration/7.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 8th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 8th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 8) {
      //8 to War
      await interaction.editReply({ files: ["./assets/regeneration/8.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The War Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The War Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 9) {
      //War to 9
      await interaction.editReply({ files: ["./assets/regeneration/war.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 9th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 9th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 10) {
      //9 to 10
      await interaction.editReply({ files: ["./assets/regeneration/9.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 10th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 10th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 11) {
      //10 to 10
      await interaction.editReply({
        files: ["./assets/regeneration/10Alt.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `The 10th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 10th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 12) {
      //10 to 11
      await interaction.editReply({ files: ["./assets/regeneration/10.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 11th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 11th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 13) {
      //11 to 12
      await interaction.editReply({ files: ["./assets/regeneration/11.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 12th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 12th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 14) {
      //12 to 13
      await interaction.editReply({ files: ["./assets/regeneration/12.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 13th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 13th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 15) {
      //13 to Master
      await interaction.editReply({
        files: ["./assets/regeneration/13Alt.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `The Master Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The Master Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 16) {
      //Master to 13
      await interaction.editReply({
        files: ["./assets/regeneration/13Master.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `The 13th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 13th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 17) {
      //13 to 14
      await interaction.editReply({ files: ["./assets/regeneration/13.gif"] });
      if (canNickname === true) {
        const nicknameWithUsername = `The 14th Doctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The 14th Doctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    } else if (randomNumber === 18) {
      //10 to 10
      await interaction.editReply({
        files: ["./assets/regeneration/shrek.gif"],
      });
      if (canNickname === true) {
        const nicknameWithUsername = `The Shroctor (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("The Shroctor").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    }
  },
};
