import {Choice} from "../types.js";
import {GelbooruAPI} from "../resources/gelbooruAPI.js";

export async function gelbooruAutocomplete(query: string): Promise<Choice[]> {
    const tagList = query.split(" ");
    const lastTag = tagList.pop()!;
    const tags = await GelbooruAPI.getSimilarTags(lastTag);
    return tags
        .filter(tag => {
            if(tag.type !== 0) return;
            if(tag.ambiguous !== 0) return;
            const name = tag.name.toLowerCase();
            for (const tag of GelbooruAPI.bannedTagWords) {
                if (name.includes(tag)) return false;
            }
            return true;
        })
        .map(tag => {
            return {
                name: `${tagList.join(" ")} ${tag.name}`,
                value: `${tagList.join(" ")} ${tag.name}`,
            }
        })
        .slice(0, 25);
}
