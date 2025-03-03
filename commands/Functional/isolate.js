const dotenv = require("dotenv");
const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    MessageFlags
} = require("discord.js");

dotenv.config({ path: '../../.env' });
const isolatePassword = process.env.ISO


module.exports = {
    data: new SlashCommandBuilder()
        .setName("isolate")
        .setDescription("What's this for?"),
    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId("isolateBuilder")
            .setTitle("Isolate");
        // Create the text input components
        const isolateInput = new TextInputBuilder()
            .setCustomId("isolateInput")
            .setLabel("ENTER PASSWORD")
            .setStyle(TextInputStyle.Short)
            // set the maximum number of characters to allow
            .setMaxLength(20)
            // set the minimum number of characters required for submission
            .setMinLength(1)
            // set a placeholder string to prompt the user
            .setPlaceholder("Enter in all caps.")
            // require a value in this input field
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(isolateInput);
        modal.addComponents(firstActionRow);


        // Show the modal to the user
        await interaction.showModal(modal);
        const submitted = await interaction
            .awaitModalSubmit({
                // Timeout after a minute of not receiving any valid Modals
                time: 60000,
                // Make sure we only accept Modals from the User who sent the original Interaction we're responding to
                filter: (i) => i.user.id === interaction.user.id,
            })
            .catch((error) => {
                // Catch any Errors that are thrown (e.g. if the awaitModalSubmit times out after 60000 ms)
                console.error(error);
                return null;
            });
        if (submitted) {
          const passwordEntered = submitted.fields.fields.first().value;
            if (passwordEntered == isolatePassword) {
                await submitted.reply({ content: `<@${interaction.user.id}> has solved the puzzle!\n<@1037466389163814932> <@672972385862942747>` });
            } else {
                await submitted.reply({ content: `Incorrect password entered.`, flags: MessageFlags.Ephemeral });
            }
        } else {
            await interaction.reply({ content: "You did not enter a password in time.", flags: MessageFlags.Ephemeral });
        }
    }
}

