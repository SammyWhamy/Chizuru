import {ApplicationCommandOptionType, APIApplicationCommandInteractionDataStringOption} from "discord-api-types/v10";
import {APIs, hentaiTags, ImageType} from "../resources/apis.js";
import {COLORS} from "../resources/colors.js";
import {ChatCommand, Embed, MessageResponse} from "dishttp";
import {hentaiAutocomplete} from "../autocomplete/hentaiAutocomplete.js";
import {processEphemeral} from "../hooks/processEphemeral.js";

export const hentai = new ChatCommand({
    data: {
        name: "hentai",
        description: 'Get a hentai image',
        nsfw: true,
        options: [{
            type: ApplicationCommandOptionType.String,
            name: 'tag',
            description: 'The kind of hentai to get',
            autocomplete: true,
            required: true,
        }],
    },
    executor: async (message) => {
        const tag = (message.data.options!.find(o => o.name === 'tag') as APIApplicationCommandInteractionDataStringOption).value;

        if(!hentaiTags.includes(`h_${tag}` as ImageType)) {
            const embed = new Embed()
                .setTitle("Invalid tag!")
                .setColor(COLORS.red);

            return new MessageResponse({embeds: [embed]});
        }

        const api = APIs[`h_${tag}` as ImageType];
        const url = await api.getUrl();

        const embed = new Embed();

        if(!url) {
            embed.setTitle('An error occurred while fetching the image.');
            embed.setColor(COLORS.red);
        } else {
            embed.setColor(COLORS.yellow);
            embed.setImage(url);
        }

        const response = new MessageResponse({embeds: [embed]});
        processEphemeral(message, response);
        return response;
    },
    autocompleter: hentaiAutocomplete,
});
