import {Command} from "../types.js";
import {
    ApplicationCommandOptionType,
    APIApplicationCommandStringOption,
    APIChatInputApplicationCommandInteraction,
    APIApplicationCommandInteractionDataStringOption
} from "discord-api-types/v10";
import {APIs, ImageType, irlTags} from "../resources/apis.js";
import {EmbedBuilder} from "../modules/builders/EmbedBuilder.js";
import {COLORS} from "../resources/colors.js";

export const irl: Command = {
    data: {
        name: 'irl',
        description: 'Get an irl porn image',
        options: [{
            type: ApplicationCommandOptionType.String,
            name: 'tag',
            description: 'The kind of porn to get',
            autocomplete: true,
            required: true,
        } as APIApplicationCommandStringOption]
    },
    props: {
        nsfw: true,
    },
    run: async (message: APIChatInputApplicationCommandInteraction) => {
        const tag = (message.data.options!.find(o => o.name === 'tag') as APIApplicationCommandInteractionDataStringOption).value;

        if(!irlTags.includes(`r_${tag}` as ImageType)) {
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

        const api = APIs[`r_${tag}` as ImageType];
        const url = await api.getUrl();

        const embed = new EmbedBuilder();

        if(!url) {
            embed.setTitle('An error occurred while fetching the image.');
            embed.setColor(COLORS.red)
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
