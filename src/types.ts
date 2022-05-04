import {APIChatInputApplicationCommandInteraction, APIApplicationCommandOption} from "discord-api-types/v10.js";

export interface Command {
    run: (message: APIChatInputApplicationCommandInteraction, env: {[key: string]: any}) => Promise<object>,
    data: {
        name: string,
        description: string,
        options?: APIApplicationCommandOption[],
    },
    props: {
        nsfw: boolean,
    }
}
