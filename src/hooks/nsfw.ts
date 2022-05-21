import {APIChatInputApplicationCommandInteraction, APITextChannel} from "discord-api-types/v10";

export async function checkNsfw(message: APIChatInputApplicationCommandInteraction, env: {[key: string]: any}) {
    const url = `https://discord.com/api/v10/channels/${message.channel_id}`;
    const headers = {
        "Authorization": `Bot ${env.DISCORD_TOKEN}`,
        "Content-Type": "application/json"
    };
    const response = await fetch(url, {
        keepalive: true,
        method: "GET",
        headers
    }).catch(() => null);

    if(!response?.ok) {
        return {
            type: 4,
            data: {
                flags: 64,
                content: "This channel is not marked as NSFW."
            },
        }
    }

    const channel = await response.json() as APITextChannel;

    if(!channel.nsfw) {
        return {
            type: 4,
            data: {
                flags: 64,
                content: "This channel is not marked as NSFW."
            },
        }
    }

    return null;
}
