import {APIChatInputApplicationCommandInteraction} from "discord-api-types/v10.js";

export function processEphemeral(message: APIChatInputApplicationCommandInteraction, response: any) {
    if (message.data.options?.some(option => option.name === "show" && "value" in option && option.value === true)) {
        response.data.flags = 0;
    } else {
        response.data.flags = 64;
    }
}
