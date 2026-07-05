import { SlashCommandBuilder } from "discord.js";
/**
 * The `ping` slash command.
 * @type {import('../../types/types.js').Command}
 */

export default {
  data: new SlashCommandBuilder()
    .setName("spoof-compatibility")
    .setDescription("Replies with compatibility status"),
  async execute(interaction) {
    await interaction.reply("Spoofing is a great thing to do!!");
  },
};
