import { SlashCommandBuilder } from "discord.js";
/**
 * The `ping` slash command.
 * @type {import('../../types/types.js').Command}
 */

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
