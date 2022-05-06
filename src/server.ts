import { Router } from 'itty-router';
import {verifyKey} from 'discord-interactions';
import {commandList} from './commands/index.js';
import {
    APIApplicationCommandInteractionDataStringOption,
    APIChatInputApplicationCommandInteraction,
    APIInteraction,
    InteractionType,
    InteractionResponseType
} from "discord-api-types/v10";
import {Command} from "./types.js";
import {JsonResponse} from "./common.js";
import {checkNsfw} from "./hooks/nsfw.js";
import {processEphemeral} from "./hooks/processEphemeral.js";
import {hentaiTags, ImageType, irlTags} from "./resources/apis.js";

const commands: Map<string, Command> = new Map();
for(const command of commandList)
    commands.set(command.data.name, command);

const router = Router();

router.get('/', (_, env) => {
    return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

router.post('/', async (request, env) => {
    let message = (await request.json!()) as APIInteraction;

    if (message.type === InteractionType.Ping)
        return new JsonResponse({type: InteractionResponseType.Pong});

    if (message.type === InteractionType.ApplicationCommand) {
        message = message as APIChatInputApplicationCommandInteraction;
        const commandName = message.data.name.toLowerCase();
        const command = commands.get(commandName);
        if (command) {
            if(command.props.nsfw) {
                const checkResult = await checkNsfw(message, env);
                if(checkResult)
                    return new JsonResponse(checkResult);
            }
            const response = await command.run(message, env as {[key: string]: any});
            processEphemeral(message, response);
            return new JsonResponse(response);
        } else {
            return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
        }
    }

    if (message.type === InteractionType.ApplicationCommandAutocomplete) {
        const query = message.data.options.find(o => (o as APIApplicationCommandInteractionDataStringOption).focused) as APIApplicationCommandInteractionDataStringOption;

        let tags: ImageType[] = [];

        if(message.data.name === "hentai") {
            tags = hentaiTags.filter(tag => tag.includes(query.value.toLowerCase())).slice(0, 25);
        } else if (message.data.name === "irl") {
            tags = irlTags.filter(tag => tag.includes(query.value.toLowerCase())).slice(0, 25);
        }

        return new JsonResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: tags.map(tag => {
                    const name = tag.split("_")[1];
                    return {
                        name: name,
                        value: name,
                    }
                })
            }
        });
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
