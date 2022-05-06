import {
    APIChatInputApplicationCommandInteraction,
    APIApplicationCommandOption,
    APIInteractionResponseChannelMessageWithSource,
    APIInteractionResponseDeferredChannelMessageWithSource
} from "discord-api-types/v10";

export interface Command {
    run: (message: APIChatInputApplicationCommandInteraction, env: {[key: string]: any}) => Promise<APIInteractionResponseChannelMessageWithSource | APIInteractionResponseDeferredChannelMessageWithSource>,
    data: {
        name: string,
        description: string,
        options?: APIApplicationCommandOption[],
    },
    props: {
        nsfw: boolean,
    }
}
