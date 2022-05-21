import {ChatCommand, Embed, MessageResponse} from "dishttp";

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

        const ephemeral = !!message.data.options?.some(option => option.name === "show" && "value" in option && option.value === true);
        return new MessageResponse({embeds: [embed], ephemeral: ephemeral});
    },
});
