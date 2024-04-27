const { SlashCommandBuilder } = require("discord.js");

const gifs = [
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862626933735445/rose-tyler.gif?ex=662ea39e&is=662d521e&hm=4484b7367110a4a486490f0d18a1b6e5bb73881bccfc18bcdf2df5ced00fd533&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862627289993398/martha-jones.gif?ex=662ea39e&is=662d521e&hm=9a15fb58b995b0cc0f61963b6ad21f7bc73bc7efce6d0f64b55e4e258ff5b5d1&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862627751497728/donna-noble.gif?ex=662ea39e&is=662d521e&hm=860f2e9eb819b958f776f764dea868234ab00454af2956dd38dfb7cdf82a4d6e&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862628305014914/amy-pond.gif?ex=662ea39e&is=662d521e&hm=937a08775702362ce48bc79e35542ee01ae35c48ede05ba9ab48d53d524471cf&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862628690886696/rory-williams.gif?ex=662ea39e&is=662d521e&hm=e3d117b411928a3e780b14c95ade1ca0c5e41dd0403ff75bd7967a3d44e75e2c&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862629056053419/clara-oswald.gif?ex=662ea39e&is=662d521e&hm=99af97ad944c8e412d2e54cd7f7acfecce72f9a0e3c9bcf2ec6dc88847fa0ad6&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862629525684365/bill-potts.gif?ex=662ea39e&is=662d521e&hm=7f23e006429932029ae023150d89af203c14c5520a94151b07d8a803e25330ae&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862629865291776/nardole.gif?ex=662ea39f&is=662d521f&hm=558150ff7600cea3f4ee1b607cd06c9ce7fc3a65f98558828646ab3dc892a199&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862630415011891/yasmin-khan.gif?ex=662ea39f&is=662d521f&hm=aaa7e43907c420e41ceec2383296ff642d2e169f504e4a5319d5b068d10ca488&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862630783975476/graham-obrien.gif?ex=662ea39f&is=662d521f&hm=569b6be4d2345f624eb4fc17779cd30118a7976764d8afe870ac43e046cf87c8&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862674429902929/ryan-sinclair.gif?ex=662ea3a9&is=662d5229&hm=3d62b95dd58cecb18d128977a86373ab15f1b29fed744b6e91771409447a93c3&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862674849468427/dan-lewis.gif?ex=662ea3a9&is=662d5229&hm=1e271e482f4c5d4fb4a74eec038ce58c975f65fe6128e019e1553655dd3e8575&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862675235213333/river-song.gif?ex=662ea3a9&is=662d5229&hm=5420f509fc2ccf655049a1986945bc35630b92112cff89753d412b7c2a2c7b0f&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862675675611247/jack-harkness.gif?ex=662ea3a9&is=662d5229&hm=2d253cf4ef10db2c239312e432b4086bd7de31f437e33ee8090e91d3c439b6cb&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862676103565393/sarah-jane.gif?ex=662ea3aa&is=662d522a&hm=8f23eafa4a680956b033cc2e11116e80826cb48d2dcb1c38da07ab2365a28dd9&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233862676535447552/jackie-tyler.gif?ex=662ea3aa&is=662d522a&hm=b520d79e73e2938b4503616f50aa28477be9dccddd88cbc72dea6b0e98a3cdf4&",
  "https://cdn.discordapp.com/attachments/1233862314558623765/1233863083177410631/ruby-sunday.gif?ex=662ea40b&is=662d528b&hm=96dc3d3ce5377e87b5f724cba5ca70ae001f0d5786d688daa4ad5ecc67d2cd1f&",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("companion")
    .setDescription("Become a random companion"),
  async execute(interaction) {
    await interaction.deferReply();
    let canNickname = true;
    const randomNumber = Math.floor(Math.random() * 17) + 1;
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
      await interaction.editReply(gifs[randomNumber]);
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
    } else if (randomNumber === 17) {
      await interaction.editReply(gifs[randomNumber]);
      if (canNickname === true) {
        const nicknameWithUsername = `Ruby Sunday (${interaction.member.user.username})`;

        if (nicknameWithUsername.length <= 32) {
          interaction.member
            .setNickname(nicknameWithUsername)
            .catch((error) => {
              console.error("Error setting nickname with username:", error);
            });
        } else {
          interaction.member.setNickname("Ruby Sunday").catch((error) => {
            console.error("Error setting nickname without username:", error);
          });
        }
      }
    }
  },
};
