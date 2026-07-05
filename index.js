/**
 * @file Bolt Helper — Discord bot entry point.
 */

import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import connection from "./db/connection.js";
import { disconnectModel } from "./db/schemas/disconnects.model.js";
dotenv.config();

/**
 * Resolved environment configuration.
 * @type {import('./src/types/types.js').EnvConfig}
 */
const env = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
};

/**
 * Registry of slash commands keyed by command name.
 * @type {import('./src/types/types.js').CommandRegistry}
 */

//commands.set(ping.name, ping);
/**
 * Registry of slash commands keyed by command name.
 * @type {import('./src/types/types.js').client}
 */

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async (readyClient) => {
  disconnectModel.sync();
  await connection.initSequelize();
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.commands = new Collection();

const foldersPath = path.join(import.meta.dirname, "/src/commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const { default: command } = await import(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  /**
   * @type {import('./src/types/types.js').client}
   */

  const client = interaction.client;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

const token = env.DISCORD_TOKEN;
if (!token) {
  console.error("Missing DISCORD_TOKEN in environment variables.");
  process.exit(1);
}

client.login(token);
