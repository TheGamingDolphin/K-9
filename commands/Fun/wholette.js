// Define four arrays of names
const namesList1 = ["1st","2nd","3rd","4th","5th","6th","7th","8th","War","9th","10th","11th","12th","13th","14th","15th","Fugitive"];
const namesList2 = ["Rose Tyler","Martha Jones","Donna Noble","Amy Pond","Rory Williams","Clara Oswald","Bill Potts","Nardole","Yasmin Khan","Graham O-Brien","Ryan Sinclair","Dan Lewis","Ruby Sunday","River Song","Jack Harkness","Sarah Jane","Jackie Tyler","Susan","Ace","Tegan Jovanka","Ian Chesterton","Barbara Wright","Adric","Jamie McCrimmon","The Brigadier","Jo Grant","K-9","Romana","Nyssa","Mel Bush","Peri Brown","Turlough","Leela","Ianto Jones"];
const namesList3 = ["Daleks","Cybermen","Silence","Autons","Ice Warriors","Weeping Angels","Abzorbaloff","Sontarans","Empty Child","Vashta Nerada","Sea Devils","Silurians","Beast","456","Slitheen","Toymaker","Master","Great Intelligence","Judoon","Macra","Zygons","P'ting","Racnoss","Family of Blood","Torchwood Sex Gas","Shadow Kin","Sycorax","Trickster","Midnight Entity"];
const namesList4 = ["Earth","Mars","Skaro","Gallifrey","Satellite Five","Mondas","the Moon","New Earth","Felspoon","Karn","Logopolis","Midnight","Ood-Sphere","Pyrovilia","Raxacoricofallapatorius","Sontar","Telos","Trenzalore","Varos","Vortis"];


const { SlashCommandBuilder } = require("discord.js");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wholette")
    .setDescription("Generate a story!"),
  async execute(interaction) {
    // Function to pick a random name from an array
    function pickRandomName(names) {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }
  
  // Pick random names from each list
  const name1 = pickRandomName(namesList1);
  const name2 = pickRandomName(namesList2);
  const name3 = pickRandomName(namesList3);
  const name4 = pickRandomName(namesList4);
  
    await interaction.deferReply();
    await interaction.editReply(`The ${name1} Doctor and ${name2} against the ${name3} on ${name4}`);
  },
};
