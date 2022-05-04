import {ping} from "./ping.js";
import {neko} from "./neko.js";
import {ApplicationCommandOptionType} from "discord-api-types/v10";

const list = [ping, neko];
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
export const commandList = list;
