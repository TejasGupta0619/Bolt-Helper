import type { ChatInputCommandInteraction } from 'discord.js';

/** Environment variables required to run the bot. */
export interface EnvConfig {
  DISCORD_TOKEN: string | undefined;
}

/** A slash command definition. */
export interface Command {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}

/** A registry of slash commands keyed by command name. */
export type CommandRegistry = Map<string, Command>;
