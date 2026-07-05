import type {
  ChatInputCommandInteraction,
  Client,
  GuildMember,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";

/** Environment variables required to run the bot. */
export interface EnvConfig {
  DISCORD_TOKEN: string | undefined;
}

/** A slash command definition. */
export interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}

export interface client extends Client {
  commands?: any;
}

/** A registry of slash commands keyed by command name. */
export type CommandRegistry = Map<string, Command>;

export type VoiceTypeMember = GuildMember;

/** Controllers Types Section **/
/** Moderation **/
export type SetDisconnectTimeType = (
  interaction: ChatInputCommandInteraction,
) => Promise<void> | void;
