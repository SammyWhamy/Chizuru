import {ApplicationCommandOptionType, APIApplicationCommandInteractionDataStringOption} from "discord-api-types/v10";
import {APIs, ImageType, irlTags} from "../resources/apis.js";
import {COLORS} from "../resources/colors.js";
import {ChatCommand, Embed, MessageResponse} from "dishttp";
import {irlAutocomplete} from "../autocomplete/irlAutocomplete.js";

export const irl = new ChatCommand({
    data: {
        name: 'irl',
        description: 'Get an irl porn image',
        nsfw: true,
        options: [{
            type: ApplicationCommandOptionType.String,
            name: 'tag',
            description: 'The kind of porn to get',
            autocomplete: true,
            required: true,
        }],
    },
    executor: async (message) => {
        const tag = (message.data.options!.find(o => o.name === 'tag') as APIApplicationCommandInteractionDataStringOption).value;

        if(!irlTags.includes(`r_${tag}` as ImageType)) {
            const embed = new Embed()
                .setTitle("Invalid tag!")
                .setColor(COLORS.red)

            return new MessageResponse({embeds: [embed]});
        }

        const api = APIs[`r_${tag}` as ImageType];
        const url = await api.getUrl();

        const embed = new Embed();

        if(!url) {
            embed.setTitle('An error occurred while fetching the image.');
            embed.setColor(COLORS.red)
        } else {
            embed.setColor(COLORS.yellow);
            embed.setImage(url);
        }

        const ephemeral = !!message.data.options?.some(option => option.name === "show" && "value" in option && option.value === true);
        return new MessageResponse({embeds: [embed], ephemeral: ephemeral});
    },
    autocompleter: irlAutocomplete,
});
