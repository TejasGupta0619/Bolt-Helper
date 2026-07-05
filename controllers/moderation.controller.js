import { MessageFlags } from "discord.js";
/**
 * @type {import('../src/types/types.js').SetDisconnectTimeType}
 */

const setDisconnectTime = async (interaction) => {
  try {
    const durationMinutes = interaction.options.getInteger("duration") ?? 0;

    /**
     * @type {import('../src/types/types.js').VoiceTypeMember}
     */
    const voiceState = /** @type {any} */ (interaction.member);
    if (!voiceState?.voice || !voiceState?.voice?.channel) {
      await interaction.reply({
        content: `You need to be in a VC!`,
        flags: [MessageFlags.Ephemeral],
      });
      return;
    }
    if (typeof durationMinutes !== "number") {
      await interaction.reply({
        content: `Type minutes in numbers!`,
      });
      return;
    }

    const durationMs = durationMinutes * 60 * 1000;

    await interaction.reply({
      content: `I will disconnect you from **${voiceState?.voice?.channel.name}** vc in ${durationMinutes} minutes.`,
    });

    //TODO save disconnect info in DB
    setTimeout(async () => {
      const currentVoiceState = voiceState?.voice;
      if (currentVoiceState?.channel) {
        await currentVoiceState.disconnect("Scheduled auto-disconnect");
        //TODO also delete the info from the db once done
      }
    }, durationMs);
  } catch (error) {
    console.log(error);
  }
};

export { setDisconnectTime };
