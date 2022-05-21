import {Command} from "../types.js";
import {
    ApplicationCommandOptionType,
    APIChatInputApplicationCommandInteraction,
    APIApplicationCommandInteractionDataStringOption
} from "discord-api-types/v10";
import {APIs, hentaiTags, ImageType} from "../resources/apis.js";
import {EmbedBuilder} from "../modules/builders/EmbedBuilder.js";
import {COLORS} from "../resources/colors.js";

export const hentai: Command = {
    data: {
        name: 'hentai',
        description: 'Get a hentai image',
        options: [{
            type: ApplicationCommandOptionType.String,
            name: 'tag',
            description: 'The kind of hentai to get',
            autocomplete: true,
            required: true,
        }]
    },
    props: {
        nsfw: true,
    },
    run: async (message: APIChatInputApplicationCommandInteraction) => {
        const tag = (message.data.options!.find(o => o.name === 'tag') as APIApplicationCommandInteractionDataStringOption).value;

        if(!hentaiTags.includes(`h_${tag}` as ImageType)) {
            const embed = new EmbedBuilder()
                .setTitle("Invalid tag!")
                .setColor(COLORS.red)
            return {
                type: 4,
                data: {
                    embeds: [embed.data],
                },
            };
        }

        const api = APIs[`h_${tag}` as ImageType];
        const url = await api.getUrl();

        const embed = new EmbedBuilder();

        if(!url) {
            embed.setTitle('An error occurred while fetching the image.');
            embed.setColor(COLORS.red);
        } else {
            embed.setColor(COLORS.yellow);
            embed.setImage(url);
        }

        return {
            type: 4,
            data: {
                embeds: [embed.data],
            }
        };
    }
}
