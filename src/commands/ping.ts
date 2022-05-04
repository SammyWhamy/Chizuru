import {Command} from "../types.js";

export const ping: Command = {
    data: {
        name: 'ping',
        description: 'Ping the bot',
    },
    props: {
        nsfw: false,
    },
    run: async () => {
        return {
            type: 4,
            data: {
                content: "Pong!",
            },
        };
    }
}
