import {ApplicationCommandOptionType} from "discord-api-types/v10";
import {ping} from "./ping.js";
import {neko} from "./neko.js";
import {highres} from "./highres.js";
import {trap} from "./trap.js";
import {blowjob} from "./blowjob.js";
import {waifu} from "./waifu.js";

const list = [ping, neko, highres, trap, blowjob, waifu];
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
