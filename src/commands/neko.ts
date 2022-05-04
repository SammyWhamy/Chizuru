import {Command} from "../types.js";

export const neko: Command = {
    data: {
        name: 'neko',
        description: 'Sends a random neko image.',
    },
    props: {
        nsfw: true,
    },
    run: async () => {
        const response = await fetch('https://api.waifu.pics/nsfw/neko');
        if(!response.ok) {
            return {
                type: 4,
                data: {
                    content: 'An error occurred while fetching the image.',
                }
            }
        }

        const data = await response.json();

        return {
            type: 4,
            data: {
                content: data.url,
            },
        };
    }
}
