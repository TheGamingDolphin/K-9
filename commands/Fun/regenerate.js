const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("regenerate")
    .setDescription("Love from Gallifrey, boys!"),
  async execute(interaction) {
    const member = interaction.member.user.username;
    let canNickname = true;
    const randomNumber = Math.floor(Math.random() * 17) + 1;
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
      await interaction.reply("https://i.gifer.com/Ac0v.gif");
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
      await interaction.reply("https://i.gifer.com/EHul.gif");
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
      await interaction.reply("https://i.gifer.com/Gx6Y.gif");
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
      await interaction.reply("https://i.gifer.com/EHun.gif");
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
      await interaction.reply("https://i.gifer.com/EHum.gif");
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
      await interaction.reply("https://i.gifer.com/EHuq.gif");
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
      await interaction.reply("https://i.gifer.com/3KMn.gif");
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
      await interaction.reply("https://i.gifer.com/Gx6k.gif");
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
      await interaction.reply(
        "https://thumbs.gfycat.com/ImpoliteYellowCaterpillar-max-1mb.gif"
      );
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
      await interaction.reply("https://tenor.com/view/-gif-3538028");
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
      await interaction.reply(
        "https://media2.giphy.com/media/CoKJD9a9pxc9W/giphy.gif"
      );
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
      await interaction.reply(
        "https://media.tenor.com/WH5GS4DSS78AAAAd/doctor-who-david-tennant.gif"
      );
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
      await interaction.reply("https://i.gifer.com/EHuf.gif");
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
      await interaction.reply(
        "https://64.media.tumblr.com/af05ce9b690536924d0216893012bb3b/tumblr_p1v23yqP9U1tgl57yo1_540.gif"
      );
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
      await interaction.reply(
        "https://media.tenor.com/7GPggFxYxBQAAAAd/regenoration-13th-doctor.gif"
      );
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
      await interaction.reply(
        "https://64.media.tumblr.com/d97f3c6fe15a54747e1c78ebf28ae774/6738b19fb6d790ad-5e/s540x810/e5ee3bb300c9bcccd2e24b6d16dd1c91d74d44e4.gif"
      );
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
      await interaction.reply(
        "https://media.tenor.com/4mOyPi1ZQNoAAAAd/doctor-doctor-who.gif"
      );
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
    }
  },
};
