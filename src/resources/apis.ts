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
    R_HighRes = 'r_4k',
    R_Gif = 'r_gif',
    R_Anal = 'r_anal',
    R_GoneWild = 'r_gonewild',
    R_Ass = 'r_ass',
    R_Pussy = 'r_pussy',
    R_Thighs = 'r_thighs',
    R_Boobs = 'r_boobs',
    H_Neko = 'h_neko',
    H_Waifu = 'h_waifu',
    H_Trap = 'h_trap',
    H_Blowjob = 'h_blowjob',
    H_HentaiAss = 'h_ass',
    H_Stomach = 'h_stomach',
    H_Hentai = 'h_hentai',
    H_Anal = 'h_anal',
    H_Thighs = 'h_thighs',
    H_BoobJob = 'h_boobjob',
    H_Tentacles = 'h_tentacles',
    H_Boobs = 'h_boobs',
    H_Yaoi = 'h_yaoi',
}

export const hentaiTags = Object.values(ImageType).filter((tag) => tag.startsWith('h_'));
export const irlTags = Object.values(ImageType).filter((tag) => tag.startsWith('r_'));

export const APIs: { [key in ImageType]: API } = {
    [ImageType.R_HighRes]: new API('R_HighRes', 'https://nekobot.xyz/api/image?type=4k', 'message'),
    [ImageType.R_Gif]: new API('R_Gif', 'https://nekobot.xyz/api/image?type=pgif', 'message'),
    [ImageType.R_Anal]: new API('R_Anal', 'https://nekobot.xyz/api/image?type=anal', 'message'),
    [ImageType.R_GoneWild]: new API('R_GoneWild', 'https://nekobot.xyz/api/image?type=gonewild', 'message'),
    [ImageType.R_Ass]: new API('R_Ass', 'https://nekobot.xyz/api/image?type=ass', 'message'),
    [ImageType.R_Pussy]: new API('R_Pussy', 'https://nekobot.xyz/api/image?type=pussy', 'message'),
    [ImageType.R_Thighs]: new API('R_Thighs', 'https://nekobot.xyz/api/image?type=thigh', 'message'),
    [ImageType.R_Boobs]: new API('R_Boobs', 'https://nekobot.xyz/api/image?type=boobs', 'message'),

    [ImageType.H_Neko]: new API('Neko', 'https://api.waifu.pics/nsfw/neko', 'url'),
    [ImageType.H_Waifu]: new API('Waifu', 'https://api.waifu.pics/nsfw/waifu', 'url'),
    [ImageType.H_Trap]: new API('Trap', 'https://api.waifu.pics/nsfw/trap', 'url'),
    [ImageType.H_Blowjob]: new API('Blowjob', 'https://api.waifu.pics/nsfw/blowjob', 'url'),
    [ImageType.H_HentaiAss]: new API('Hentai Ass', 'https://nekobot.xyz/api/image?type=hass', 'message'),
    [ImageType.H_Stomach]: new API('Stomach', 'https://nekobot.xyz/api/image?type=hmidriff', 'message'),
    [ImageType.H_Hentai]: new API('Hentai', 'https://nekobot.xyz/api/image?type=hentai', 'message'),
    [ImageType.H_Anal]: new API('Anal', 'https://nekobot.xyz/api/image?type=hanal', 'message'),
    [ImageType.H_Thighs]: new API('Thighs', 'https://nekobot.xyz/api/image?type=hthigh', 'message'),
    [ImageType.H_BoobJob]: new API('BoobJob', 'https://nekobot.xyz/api/image?type=paizuri', 'message'),
    [ImageType.H_Tentacles]: new API('Tentacles', 'https://nekobot.xyz/api/image?type=tentacle', 'message'),
    [ImageType.H_Boobs]: new API('Boobs', 'https://nekobot.xyz/api/image?type=hboobs', 'message'),
    [ImageType.H_Yaoi]: new API('Yaoi', 'https://nekobot.xyz/api/image?type=yaoi', 'message'),
}
