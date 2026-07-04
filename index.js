/**
 * @file Bolt Helper — Discord bot entry point.
 */

import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

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
const commands = new Map();

/**
 * The `ping` slash command.
 * @type {import('./src/types/types.js').Command}
 */
const pingCommand = {
  name: "ping",
  description: "Replies with Pong!",
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
commands.set(pingCommand.name, pingCommand);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    await message.reply("Pong!");
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
});

const token = env.DISCORD_TOKEN;
if (!token) {
  console.error("Missing DISCORD_TOKEN in environment variables.");
  process.exit(1);
}

client.login(token);
