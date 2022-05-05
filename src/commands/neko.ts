import {Command} from "../types.js";
import {APIs, ImageType} from "../resources/apis.js";
import {EmbedBuilder} from "@discordjs/builders";
import {COLORS} from "../resources/colors.js";

export const neko: Command = {
    data: {
        name: 'neko',
        description: 'Sends a random neko image.',
    },
    props: {
        nsfw: true,
    },
    run: async () => {
        const url = await APIs.get(ImageType.Neko)?.getUrl();

        const embed = new EmbedBuilder();

        if(!url) {
            embed.setTitle('An error occurred while fetching the image.');
            embed.setColor(COLORS.red)
        } else {
            embed.setTitle("Have a cute neko~!");
            embed.setColor(COLORS.yellow);
        }

        return {
            type: 4,
            data: {
                embeds: [embed.data],
            }
        };
    }
}
