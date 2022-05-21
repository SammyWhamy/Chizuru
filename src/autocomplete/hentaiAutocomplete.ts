import {hentaiTags} from "../resources/apis.js";
import {Choice} from "../types.js";

export function hentaiAutocomplete(query: string | number): Choice[] {
    return hentaiTags.filter(tag => tag.includes(query.toString().toLowerCase())).slice(0, 25)
        .map(tag => {
            const name = tag.split("_")[1];
            return {
                name: name,
                value: name,
            }
        });
}
