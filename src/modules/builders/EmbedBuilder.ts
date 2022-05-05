import type { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord-api-types/v10';

export type RGBTuple = [red: number, green: number, blue: number];

export interface IconData {
    iconURL?: string;
    proxyIconURL?: string;
}

export type EmbedAuthorData = Omit<APIEmbedAuthor, 'icon_url' | 'proxy_icon_url'> & IconData;

export type EmbedAuthorOptions = Omit<EmbedAuthorData, 'proxyIconURL'>;

export type EmbedFooterData = Omit<APIEmbedFooter, 'icon_url' | 'proxy_icon_url'> & IconData;

export type EmbedFooterOptions = Omit<EmbedFooterData, 'proxyIconURL'>;

export interface EmbedImageData extends Omit<APIEmbedImage, 'proxy_url'> {
    proxyURL?: string;
}

export class EmbedBuilder {
    public readonly data: APIEmbed;

    public constructor(data: APIEmbed = {}) {
        this.data = { ...data };
        if (data.timestamp) this.data.timestamp = new Date(data.timestamp).toISOString();
    }

    public addFields(fields: APIEmbedField[]): this {
        if (this.data.fields) this.data.fields.push(...fields);
        else this.data.fields = fields;
        return this;
    }

    public spliceFields(index: number, deleteCount: number, ...fields: APIEmbedField[]): this {
        if (this.data.fields) this.data.fields.splice(index, deleteCount, ...fields);
        else this.data.fields = fields;
        return this;
    }

    public setFields(fields: APIEmbedField[]) {
        this.spliceFields(0, this.data.fields?.length ?? 0, ...fields);
        return this;
    }

    public setAuthor(options: EmbedAuthorOptions | null): this {
        if (options === null) {
            this.data.author = undefined;
            return this;
        }

        this.data.author = { name: options.name, url: options.url, icon_url: options.iconURL };
        return this;
    }

    public setColor(color: number | RGBTuple | null): this {
        if (Array.isArray(color)) {
            const [red, green, blue] = color;
            this.data.color = (red << 16) + (green << 8) + blue;
            return this;
        }
        this.data.color = color ?? undefined;
        return this;
    }

    public setDescription(description: string | null): this {
        this.data.description = description ?? undefined;
        return this;
    }

    public setFooter(options: EmbedFooterOptions | null): this {
        if (options === null) {
            this.data.footer = undefined;
            return this;
        }

        this.data.footer = { text: options.text, icon_url: options.iconURL };
        return this;
    }

    public setImage(url: string | null): this {
        this.data.image = url ? { url } : undefined;
        return this;
    }

    public setThumbnail(url: string | null): this {
        this.data.thumbnail = url ? { url } : undefined;
        return this;
    }

    public setTimestamp(timestamp: number | Date | null = Date.now()): this {
        this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined;
        return this;
    }

    public setTitle(title: string | null): this {
        this.data.title = title ?? undefined;
        return this;
    }

    public setURL(url: string | null): this {
        this.data.url = url ?? undefined;
        return this;
    }

    public toJSON(): APIEmbed {
        return { ...this.data };
    }
}
