import {ApplicationCommandOptionType} from "discord-api-types/v10";
import {ping} from "./ping.js";
import {hentai} from "./hentai.js";
import {irl} from "./irl.js";

const list = [ping, hentai, irl];
for(const command of list) {
    if(!command.data.options)
        command.data.options = [];

    command.data.options.push({
        type: ApplicationCommandOptionType.Boolean,
        name: "show",
        description: "Publicly display the output?",
        required: false,
    })
}

export const commands = list;
