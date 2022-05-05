async function getImage(this: API): Promise<string | null> {
  const response = await fetch(this.url).catch(() => null);
  if (!response?.ok) return null;
  const data = await response.json();
  return data[this.field];
}

export class API {
    public name: string;
    public url: string;
    public field: string;
    public getUrl: () => Promise<string | null> = getImage.bind(this);

    constructor(name: string, url: string, field: string) {
        this.name = name;
        this.url = url;
        this.field = field;
    }
}


export enum ImageType {
    Neko = 'neko',
}

const APIs: Map<ImageType, API> = new Map();

APIs.set(ImageType.Neko, new API('Neko', 'https://nekos.life/api/v2/img/neko', 'url'));

export { APIs };
