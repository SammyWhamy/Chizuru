import {APIApplicationCommandInteraction} from "discord-api-types/v10.js";

export interface Command {
    run: (message: APIApplicationCommandInteraction, env: {[key: string]: any}) => Promise<Response>,
    data: {
        name: string,
        description: string,
    }
}
