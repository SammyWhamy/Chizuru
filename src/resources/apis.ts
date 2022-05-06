async function getImage(this: API): Promise<string | null> {
  const response = await fetch(this.url);
  if (!response?.ok) return null;
  const data = await response.json();
  return data[this.field];
}

export class API {
    public name: string;
    public url: string;
    public field: string;
    public getUrl: () => Promise<string | null>;

    constructor(name: string, url: string, field: string) {
        this.name = name;
        this.url = url;
        this.field = field;
        this.getUrl = getImage.bind(this);
    }
}


export enum ImageType {
    Neko = 'neko',
    HighRes = '4k',
    Waifu = 'waifu',
    Trap = 'trap',
    Blowjob = 'blowjob',
}

export const APIs: { [key in ImageType]: API } = {
    [ImageType.Neko]: new API('Neko', 'https://api.waifu.pics/nsfw/neko', 'url'),
    [ImageType.HighRes]: new API('HighRes', 'http://api.nekos.fun:8080/api/4k', 'image'),
    [ImageType.Waifu]: new API('Waifu', 'https://api.waifu.pics/nsfw/waifu', 'url'),
    [ImageType.Trap]: new API('Trap', 'https://api.waifu.pics/nsfw/trap', 'url'),
    [ImageType.Blowjob]: new API('Blowjob', 'https://api.waifu.pics/nsfw/blowjob', 'url'),
};
