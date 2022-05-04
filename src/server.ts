import { Router } from 'itty-router';
import {InteractionResponseType, InteractionType, verifyKey} from 'discord-interactions';
import {list} from './commands/index.js';
import {APIApplicationCommandInteraction} from "discord-api-types/v10.js";
import {Command} from "./types.js";
import {JsonResponse} from "./common.js";

const commands: Map<string, Command> = new Map();
for(const command of list)
    commands.set(command.data.name, command);

const router = Router();

router.get('/', (_, env) => {
    return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

router.post('/', async (request, env) => {
    const message = (await request.json!());

    if (message.type === InteractionType.PING)
        return new JsonResponse({type: InteractionResponseType.PONG});

    if (message.type === InteractionType.APPLICATION_COMMAND) {
        const commandName = message.data.name.toLowerCase();
        const command = commands.get(commandName);
        if (command) {
            return await command.run(message as APIApplicationCommandInteraction, env as {[key: string]: any});
        } else {
            return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }

    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
    async fetch(request: Request, env: NodeJS.ProcessEnv) {
        if (request.method === 'POST') {
            const signature = request.headers.get('x-signature-ed25519');
            const timestamp = request.headers.get('x-signature-timestamp');

            if(!signature || !timestamp || !env.DISCORD_PUBLIC_KEY)
                return new Response('Bad request signature.', { status: 401 });

            const body = await request.clone().arrayBuffer();
            const isValidRequest = verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY);

            if (!isValidRequest)
                return new Response('Bad request signature.', { status: 401 });
        }

        return router.handle(request, env);
    },
};
