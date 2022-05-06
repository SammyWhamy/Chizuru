import {API} from "../../resources/apis.js";
import {Command} from "../../types.js";
import {EmbedBuilder} from "./EmbedBuilder.js";
import {COLORS} from "../../resources/colors.js";

export interface ImageCommandOptions {
    command: Omit<Command, "run">;
    api?: API,
    imageTitle?: string;
}

export class ImageCommandBuilder {
    public readonly data: ImageCommandOptions;

    public constructor(options: ImageCommandOptions = {command: {props: {nsfw: true}, data: {name: "", description: ""}}}) {
        this.data = options;
    }

    public setApi(api: API): ImageCommandBuilder {
        this.data.api = api;
        return this;
    }

    public setImageTitle(title: string): ImageCommandBuilder {
        this.data.imageTitle = title;
        return this;
    }

    public setCommandData(data: Omit<Command, "run">): ImageCommandBuilder {
        this.data.command = data;
        return this;
    }

    public setName(name: string): ImageCommandBuilder {
        this.data.command.data.name = name;
        return this;
    }

    public setDescription(description: string): ImageCommandBuilder {
        this.data.command.data.description = description;
        return this;
    }

    public setNSFW(nsfw: boolean): ImageCommandBuilder {
        this.data.command.props.nsfw = nsfw;
        return this;
    }

    public build(): Command {
        if(!this.data.api)throw new Error("API is not set");
        if(!this.data.command) throw new Error("Command is not set");
        if(!this.data.command.data.name) throw new Error("Command name is not set");
        if(!this.data.command.data.description) throw new Error("Command description is not set");

        return {
            ...this.data.command,
            run: async () => {
                const url = await this.data.api!.getUrl();
                const embed = new EmbedBuilder();

                if(!url) {
                    embed.setTitle('An error occurred while fetching the image.');
                    embed.setColor(COLORS.red)
                } else {
                    if(this.data.imageTitle) embed.setTitle(this.data.imageTitle);
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
    }
}
