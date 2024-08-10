const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const fs = require("node:fs");

let activeGameChannel = null; // Track the channel where the active game is happening

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roulette")
        .setDescription("Let's go gambling!"),
    async execute(interaction) {
        // Check if there's already an active game
        if (activeGameChannel) {
            await interaction.reply(`Sorry, we could only afford one gun. There's currently a game going in <#${activeGameChannel.id}>`);
            return;
        }

        activeGameChannel = interaction.channel; // Set the current channel as the active game channel

        // Read the contents of the score file
        let fileContents = fs.readFileSync("././roulette.txt", "utf-8");
        let scores = fileContents ? fileContents.split("\n").filter(line => line).map(line => {
            const [id, score, username] = line.split(",");
            return { id, username, score: parseInt(score, 10) };
        }) : [];

        const userID = interaction.user.id;
        const username = interaction.user.username;

        if (!scores.find(s => s.id === userID)) {
            // If the user ID doesn't exist, append a new score line to the file
            scores.push({ id: userID, username, score: 0 });
            fs.appendFileSync("././roulette.txt", `${userID},0,${username}\n`, "utf-8");
        }

        // Players list
        let players = [{ id: userID, name: username }];
        
        // Countdown setup
        const countdownSeconds = 30; // Set the countdown duration
        const endTime = Math.floor(Date.now() / 1000) + countdownSeconds; // Unix time when the countdown ends

        // Create a button
        let button = new ButtonBuilder()
            .setCustomId('join_roulette')
            .setLabel('Join Game')
            .setStyle(ButtonStyle.Success);

        // Create an action row with the button
        let row = new ActionRowBuilder().addComponents(button);

        // Send the initial message with the button and countdown
        const message = await interaction.reply({ 
            content: `Welcome to roulette!\nSurviving games will increase your score, but if you lose it will be reset to 0 and you will be muted for 5 minutes.\nHaving the highest score will reward you with the "Let's go gambling!" role!\n\nPlayers: ${players.length}/6\n${players.map(p => p.name).join('\n')}\nStarting: <t:${endTime}:R>`, 
            components: [row],
            fetchReply: true // Fetch the sent message to update it later
        });

        // Create a collector to handle button interactions
        const filter = i => i.customId === 'join_roulette';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: countdownSeconds * 1000 });

        collector.on('collect', async i => {
            try {
                const joinUserID = i.user.id;
                const joinUsername = i.user.username;

                if (players.find(p => p.id === joinUserID)) {
                    // If the user has already joined, send an ephemeral message
                    await i.reply({ content: "You've already joined this game.", ephemeral: true });
                } else {
                    if (players.length < 6) {
                        if (!scores.find(s => s.id === joinUserID)) {
                            // If the user ID doesn't exist in scores, append a new score line to the array and file
                            scores.push({ id: joinUserID, username: joinUsername, score: 0 });
                            fs.appendFileSync("././roulette.txt", `${joinUserID},0,${joinUsername}\n`, "utf-8");
                        }

                        await i.deferReply({ ephemeral: true }); // Acknowledge the interaction

                        // Update the players list
                        players.push({ id: joinUserID, name: joinUsername });
                        
                        // Check if the player count reaches 6 and disable the button if it does
                        if (players.length >= 6) {
                            button = button.setDisabled(true); // Disable the button
                            row = new ActionRowBuilder().addComponents(button); // Update the row
                        }

                        // Update the original message
                        await interaction.editReply({ 
                            content: `Welcome to roulette!\nSurviving games will increase your score, but if you lose it will be reset to 0 and you will be muted for 5 minutes.\nHaving the highest score will reward you with the "Let's go gambling!" role!\n\nPlayers: ${players.length}/6\n${players.map(p => p.name).join('\n')}\nStarting: <t:${endTime}:R>`, 
                            components: [row]
                        });

                        await i.followUp({ content: "You've joined the game!", ephemeral: true }); // Notify the user
                    } else {
                        // If the game is full, inform the user
                        await i.reply({ content: "Sorry, the game is full.", ephemeral: true });
                    }
                }
            } catch (error) {
                console.error('Failed to update interaction:', error.message);
            }
        });

        collector.on('end', async () => {
            if (players.length > 1) {
                // Start the game!
                await startGame(message, players);
            } else {
                await interaction.followUp('Not enough players to start the game.');
                activeGameChannel = null; // Reset active game channel if not enough players
            }
        });

        async function startGame(message, players) {
            let currentTurnIndex = Math.floor(Math.random() * players.length); // Randomly select the first player
            let loseChance = 6; // Initial lose chance denominator (1/6, 1/5, etc.)
            let gameEnded = false; // Flag to track if the game has ended

            const proceedTurn = async () => {
                if (gameEnded) return; // Stop execution if the game has ended

                const currentPlayer = players[currentTurnIndex];
                let buttons = players.map((player) => 
                    new ButtonBuilder()
                        .setCustomId(player.name)
                        .setLabel(player.name)
                        .setStyle(ButtonStyle.Primary)
                );

                let row = new ActionRowBuilder().addComponents(buttons);

                // Update the same message for the player's turn
                const endTurn = Math.floor(Date.now() / 1000) + countdownSeconds;
                await message.edit({
                    content: `<@${currentPlayer.id}>, it's your turn!\nChoose a player to shoot. Alternatively, you can choose to shoot yourself for an extra turn!\nChance of death: 1/${loseChance}\nTurn skipped: <t:${endTurn}:R>`,
                    components: [row]
                });

                const filter = i => players.map(p => p.name).includes(i.customId);
                const turnCollector = message.channel.createMessageComponentCollector({ filter, time: 30000 });

                turnCollector.on('collect', async i => {
                    if (i.user.id !== currentPlayer.id) {
                        await i.reply({ content: "It's not your turn!", ephemeral: true });
                        return;
                    }

                    await i.deferUpdate(); // Acknowledge the interaction

                    // Determine if the selected player loses
                    const selectedPlayerName = i.customId;
                    const selectedPlayer = players.find(p => p.name === selectedPlayerName);
                    const random = Math.floor(Math.random() * loseChance);

                    if (random === 0) {
                        // The selected player loses
                        await message.edit({
                            content: `${selectedPlayerName} has lost and has had their streak reset to 0! Give them 5 minutes to regenerate.\nAll other players get +1 point added to their streak!`,
                            components: []
                        });

                        // Update scores: Increment for all except the loser
                        scores = scores.map(score => {
                            if (score.id === selectedPlayer.id) {
                                return { id: score.id, username: score.username, score: 0 }; // Reset the loser's score
                            } else if (players.find(p => p.id === score.id)) {
                                return { id: score.id, username: score.username, score: score.score + 1 }; // Increment the score for others
                            }
                            return score; // Keep other scores as is
                        });

                        // Write the updated scores back to the file
                        fs.writeFileSync("././roulette.txt", scores.map(score => `${score.id},${score.score},${score.username}`).join("\n") + "\n", "utf-8");

                        // Timeout the losing player for 5 minutes
                        try {
                            const member = await interaction.guild.members.fetch(selectedPlayer.id);
                            await member.timeout(5 * 60 * 1000, 'aw dang it'); // 5 minutes timeout
                        } catch (error) {
                            console.error(`Failed to timeout ${selectedPlayerName}:`, error.message);
                        }

                        players = players.filter(player => player.id !== selectedPlayer.id);
                        gameEnded = true; // Set the flag to indicate the game has ended
                        activeGameChannel = null; // Reset active game channel after game ends
                        
                        
                            // Display the leaderboard and top player(s)
                            await displayLeaderboard(players, scores, interaction);
                        
                    } else {
                        // The selected player does not lose
                        if (selectedPlayer.name === currentPlayer.name) {
                            // If the player selected themselves, they get another turn
                            loseChance--;
                        } else {
                            // Otherwise, the turn passes to the next player
                            loseChance--;
                            currentTurnIndex = (currentTurnIndex + 1) % players.length;
                        }
                    }

                    turnCollector.stop(); // End the turn and start the next one
                    if (players.length > 1 && !gameEnded) {
                        proceedTurn();
                    }
                });

                turnCollector.on('end', async collected => {
                    if (collected.size === 0 && players.length > 1 && !gameEnded) {
                        currentTurnIndex = (currentTurnIndex + 1) % players.length;
                        proceedTurn();
                    }
                });
            };

            proceedTurn(); // Start the first turn
        }

        async function displayLeaderboard(players, scores, interaction) {
            // Sort the scores of players who participated in the game
            let gameScores = scores.filter(score => players.find(p => p.id === score.id));
            gameScores.sort((a, b) => b.score - a.score);
        
            let leaderboardMessage = "Game Leaderboard:\n\n";
            gameScores.forEach((score, index) => {
                leaderboardMessage += `${index + 1}. ${score.username}: ${score.score}\n`;
            });
        
            // Find the top player(s) in the server
            let maxScore = Math.max(...scores.map(score => score.score));
            let topPlayers = scores.filter(score => score.score === maxScore);
        
            leaderboardMessage += `\nTop player${topPlayers.length > 1 ? 's' : ''}: `;
            topPlayers.forEach((player, index) => {
                leaderboardMessage += `👑${player.username} (${player.score})${index < topPlayers.length - 1 ? ', ' : ''}`;
            });
        
            const topRoleID = '1271598076255141899';
            const guild = interaction.guild;
        
            try {
                // Fetch the top role
                const topRole = await guild.roles.fetch(topRoleID);
        
                // If the role doesn't exist, topRole will be null
                if (!topRole) {
                    throw new Error(`Role with ID ${topRoleID} does not exist in this server.`);
                }
        
                // First, remove the top role from all members who have it
                const membersWithTopRole = topRole.members;
                for (const member of membersWithTopRole.values()) {
                    if (!topPlayers.some(player => player.id === member.id)) {
                        await member.roles.remove(topRoleID);
                    }
                }
        
                // Then, assign the top role to the new top player(s)
                for (const player of topPlayers) {
                    try {
                        const member = await guild.members.fetch(player.id);
                        await member.roles.add(topRoleID);
                    } catch (error) {
                        console.error(`Failed to assign top role to ${player.username}:`, error.message);
                    }
                }
        
            } catch (error) {
                console.error('Error processing the top role:', error.message);
                // Inform the user that the role update failed
                await interaction.followUp({
                    content: `Leaderboard updated, but could not assign the "Let's go gambling!" role because it does not exist in this server.`,
                });
                return;
            }
        
            // Send the leaderboard message
            await interaction.followUp({ content: leaderboardMessage });
        }
    }
}