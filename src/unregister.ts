import 'dishttp/nodeInit';
import 'dotenv/config';
import { client } from './index.js';

const response = await client.unregisterAllCommands({
    token: process.env.DISCORD_TOKEN!,
    applicationId: process.env.DISCORD_APPLICATION_ID!,
    guildId: process.env.DISCORD_TEST_GUILD_ID,
});

console.log(response);
