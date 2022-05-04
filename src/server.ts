import { Router } from 'itty-router';
import {verifyKey} from 'discord-interactions';

const router = Router();

router.get('/', (_, env) => {
    return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
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
