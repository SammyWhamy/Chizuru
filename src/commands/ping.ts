import {Command} from "../types.js";
import {JsonResponse} from "../common.js";

export const ping: Command = {
    data: {
        name: 'ping',
        description: 'Ping the bot',
    },
    run: async () => {
        return new JsonResponse({
            type: 4,
            data: {
                content: "Pong!",
            },
        });
    }
}
