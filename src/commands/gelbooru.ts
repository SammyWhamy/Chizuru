import {Command} from "../types.js";
import {APIChatInputApplicationCommandInteraction, ApplicationCommandOptionType} from "discord-api-types/v10";
import {APIApplicationCommandInteractionDataStringOption} from "discord-api-types/v10.js";
import {GelbooruAPI, GelbooruPost, GelbooruRating} from "../resources/gelbooruAPI.js";
import {EmbedBuilder} from "../modules/builders/EmbedBuilder.js";
import {COLORS} from "../resources/colors.js";

export const gelbooru: Command = {
    data: {
        name: "gelbooru",
        description: "Search any posts on gelbooru.",
        options: [{
            type: ApplicationCommandOptionType.String,
            name: "tags",
            description: "Tags to search for.",
            required: true,
            autocomplete: true,
        }, {
            type: ApplicationCommandOptionType.String,
            name: 'rating',
            description: 'The rating of the images to get',
            required: false,
            choices: Object.values(GelbooruRating).map(rating => {
                return {
                    name: rating,
                    value: rating,
                }
            }),
        }],
    },
    props: {
        nsfw: true,
    },
    run: async (message: APIChatInputApplicationCommandInteraction) => {
        const tagString = (message.data.options!.find(o => o.name === 'tags') as APIApplicationCommandInteractionDataStringOption).value;
        const rating = (message.data.options!.find(o => o.name === 'rating') as APIApplicationCommandInteractionDataStringOption)?.value as GelbooruRating;

        const tags = tagString.split(' ');
        if(rating && !tags.includes('rating:'))
            tags.push(`rating:${rating}`);

        let result: {post: GelbooruPost, count: number} | null;
        try {
            result = await GelbooruAPI.getPost(tags);
        } catch (e) {
            console.log(e);

            const embed = new EmbedBuilder()
                .setTitle('An error occurred while fetching posts from gelbooru.')
                .setColor(COLORS.red);

            return {
                type: 4,
                data: {
                    embeds: [embed.data],
                }
            };
        }

        if(!result?.post) {
            const embed = new EmbedBuilder()
                .setTitle('No posts found with those tags.')
                .setColor(COLORS.red);

            return {
                type: 4,
                data: {
                    embeds: [embed.data],
                }
            }
        }

        const embed = new EmbedBuilder()
            .setImage(result.post.file_url)
            .setColor(COLORS.yellow)
            .setFooter({text: `Posts found: ${result.count} | Score: ${result.post.score} • Powered by Gelbooru`, iconURL: 'https://gelbooru.com/favicon.ico'});

        if(result.post.title)
            embed.setTitle(result.post.title);

        return {
            type: 4,
            data: {
                embeds: [embed.data],
            }
        }
    }
}
