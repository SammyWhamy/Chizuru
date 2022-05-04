import fetch from "node-fetch";
import "dotenv/config";
import {list as commands} from "./commands/index.js";

const token = process.env.DISCORD_TOKEN;
const applicationId = process.env.DISCORD_APPLICATION_ID;
const testGuildId = process.env.DISCORD_TEST_GUILD_ID;

if (!token)
    throw new Error('The DISCORD_TOKEN environment variable is required.');

if (!applicationId)
    throw new Error('The DISCORD_APPLICATION_ID environment variable is required.');

async function registerGuildCommands() {
    if (!testGuildId)
        throw new Error('The DISCORD_TEST_GUILD_ID environment variable is required.');

    const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${testGuildId}/commands`;
    const res = await registerCommands(url);
    const json = await res.json() as any;
    console.log(json);
    for (const cmd of json) {
        const response = await fetch(`https://discord.com/api/v10/applications/${applicationId}/guilds/${testGuildId}/commands/${cmd.id}`);
        if (!response.ok) {
            console.error(`Problem removing command ${cmd.id}`);
        }
    }
}

async function registerCommands(url: string) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify(commands.map(c => c.data)),
    });

    if (response.ok) {
        console.log('Registered all commands');
    } else {
        console.error('Error registering commands');
        const text = await response.text();
        console.error(text);
    }
    return response;
}

await registerGuildCommands();