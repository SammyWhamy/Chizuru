import {ChatCommand, Embed, MessageResponse} from "dishttp";
import {APIApplicationCommandInteractionDataStringOption, ApplicationCommandOptionType} from "discord-api-types/v10";
import {COLORS} from "../resources/colors.js";
import {gdata} from "../resources/apis/e-hentai.js";

const galleryRegex = /g\/(?<id>\d+)\/(?<token>[a-z\d]+)/gm;

export const ehentai = new ChatCommand({
    data: {
        name: 'ehentai',
        description: 'Display an e-hentai gallery',
        nsfw: true,
        options: [{
            type: ApplicationCommandOptionType.String,
            name: 'link',
            description: 'The link to the gallery or the page',
            required: true,
        }]
    },
    executor: async (message) => {
        const link = (message.data.options!.find(o => o.name === 'link') as APIApplicationCommandInteractionDataStringOption).value;

        const galleryMatch = galleryRegex.exec(link);
        if(!galleryMatch) {
            const embed = new Embed()
                .setColor(COLORS.red)
                .setTitle("Invalid link!")

            return new MessageResponse({embeds: [embed]});
        }

        const id = parseInt(galleryMatch.groups!.id);
        const token = galleryMatch.groups!.token;

        const metadata = await gdata(id, token);

        if(!metadata) {
            const embed = new Embed()
                .setColor(COLORS.red)
                .setTitle("Something went wrong!")
                .setDescription("Please try again later.")

            return new MessageResponse({embeds: [embed]});
        }

        if("error" in metadata) {
            const embed = new Embed()
                .setColor(COLORS.red)
                .setTitle(metadata.error)

            return new MessageResponse({embeds: [embed]});
        }

        const embed = new Embed()
            .setColor(COLORS.yellow)
            .setTitle(metadata.title)
            .addField("Rating", metadata.rating, true)
            .addField("Category", metadata.category, true)
            .addField("Pages", metadata.filecount, true)
            .addField("Tags", `\`${metadata.tags.join("`, `")}\``, true)
            .setURL(`https://e-hentai.org/g/${id}/${token}`)
            .setFooter({text: `Uploaded by: ${metadata.uploader} • Powered by e-hentai.org`, iconURL: "https://e-hentai.org/favicon.png"})
            .setImage(metadata.thumb)

        return new MessageResponse({embeds: [embed]});
    }
})
