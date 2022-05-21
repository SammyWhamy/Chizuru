import {APIChatInputApplicationCommandInteraction} from "discord-api-types/v10";
import {MessageResponse} from "dishttp";

export function processEphemeral(message: APIChatInputApplicationCommandInteraction, response: MessageResponse) {
    const shouldShow = message.data.options?.some(option => option.name === "show" && "value" in option && option.value === true) || true;
    response.setEphemeral(!shouldShow);
}
