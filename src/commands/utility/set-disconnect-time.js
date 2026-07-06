import { SlashCommandBuilder } from "discord.js";
import { setDisconnectTime } from "../../../controllers/moderation.controller.js";
/**
 * The `ping` slash command.
 * @type {import('../../types/types.js').Command}
 */

export default {
  data: new SlashCommandBuilder()
    .setName("set-disconnect-time")
    .setDescription("To schedule disconnection from vc")
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Type the number of minutes before disconnection")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(1440),
    ),
  execute: (interaction) => setDisconnectTime(interaction),
};
