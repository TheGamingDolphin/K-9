import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN;

import config from "./config.json" assert { type: "json" };
const { clientId, guildId } = config;

const commands = [];

// Get the path to the commands directory
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "commands");

// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Import each command module and push its toJSON result to the commands array
const promises = [];
for (const file of commandFiles) {
  const commandPath = `./commands/${file}`;
  promises.push(import(commandPath));
}

Promise.all(promises).then((modules) => {
  modules.forEach((module) => {
    const command = module.default && typeof module.default.toJSON === "function" ? module.default.toJSON() : null;
    if (command) {
      commands.push(command);
    }
  });

  const rest = new REST({ version: "10" }).setToken(token);

  rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
});


// Deploy the commands to the specified guild
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const rest = new REST({ version: "10" }).setToken(token);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
