import {ChatCommand, Embed, MessageResponse} from "dishttp";
import {processEphemeral} from "../hooks/processEphemeral.js";

export const ping = new ChatCommand({
    data: {
        name: 'ping',
        description: 'Ping the bot',
        nsfw: false,
    },
    executor: async (message) => {
        const embed = new Embed()
            .setTitle("Pong!")
            .setColor(0xFFAACC)

        const response = new MessageResponse({embeds: [embed]});
        processEphemeral(message, response);
        return response;
    },
});
