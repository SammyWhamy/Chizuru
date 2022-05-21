export enum GelbooruRating {
    Safe = "safe",
    Questionable = "questionable",
    Explicit = "explicit"
}

export interface ResponseAttributes {
    limit: number,
    offset: number,
    count: number,
}

export interface GelbooruPost {
    id: number,
    created_at: string,
    score: number,
    width: number,
    height: number,
    md5: string,
    directory: string,
    image: string,
    rating: GelbooruRating,
    source: string,
    change: number,
    owner: string,
    creator_id: number,
    parent_id: number,
    sample: number,
    preview_height: number,
    preview_width: number,
    tags: string,
    title: string,
    has_notes: string,
    has_comments: string,
    file_url: string,
    preview_url: string,
    sample_url: string,
    sample_height: number,
    sample_width: number,
    status: "active",
    post_locked: number,
    has_children: string,
}

export interface GelbooruPostResponse {
    ["@attributes"]: ResponseAttributes,
    post: GelbooruPost[];
}

export interface GelbooruTag {
    id: number,
    name: string,
    count: number,
    type: number,
    ambiguous: number,
}

export interface GelbooruTagResponse {
    ["@attributes"]: ResponseAttributes,
    tag: GelbooruTag[];
}

export class GelbooruAPI {
    public static readonly bannedTags = ["-loli*", '-shota*', '-*gore*', '-*rape*']
    public static readonly bannedTagWords = ["loli", "shota", "blood", "rape", "gore"]

    private static readonly postBaseURL = 'https://gelbooru.com/index.php?page=dapi&s=post&q=index';
    private static readonly tagBaseURL = 'https://gelbooru.com/index.php?page=dapi&s=tag&q=index';

    public static async getPosts(tags: string[]): Promise<{count: number, posts: GelbooruPost[]}> {
        tags.push(...(GelbooruAPI.bannedTags), 'sort:random');
        const url = GelbooruAPI.postBaseURL
            + '&tags=' + tags.join('+')
            + '&limit=100'
            + '&json=1';

        const response = await fetch(url, {keepalive: true});
        if (!response?.ok) throw new Error('Failed to fetch posts');
        const json = await response.json() as GelbooruPostResponse;
        return {
            posts: json.post,
            count: json["@attributes"].count,
        };
    }

    public static async getSimilarTags(tag: string): Promise<GelbooruTag[]> {
        const url = GelbooruAPI.tagBaseURL
            + '&limit=200'
            + `&name_pattern=${tag}%`
            + '&json=1'
            + '&order=DESC'
            + '&order_by=count';

        const response = await fetch(url, {keepalive: true});
        if (!response?.ok) throw new Error('Failed to fetch tags');
        const json = await response.json() as GelbooruTagResponse;
        return json.tag;
    }

    public static async getPost(tags: string[]): Promise<{count: number, post: GelbooruPost} | null> {
        const {count, posts} = await GelbooruAPI.getPosts(tags);
        if (!posts?.[0]) return null;
        return {
            count: count,
            post: posts[0]
        }
    }
}
