export interface Torrent {
    hash: string;
    added: string;
    name: string;
    tsize: string;
    fsize: string;
}

export interface GalleryMetaData {
    gid: number;
    token: string;
    archiver_key: string;
    title: string;
    title_jpn: string;
    category: string;
    thumb: string;
    uploader: string;
    posted: string;
    filecount: string;
    filesize: number;
    expunged: boolean;
    rating: string;
    torrentcount: string;
    torrents: Torrent[];
    tags: string[];
}

export interface GalleryError {
    gid: number;
    error: string;
}

export async function gdata(id: number, token: string) {
    const response = await fetch(`https://api.e-hentai.org/api.php`, {
        method: "POST",
        body: JSON.stringify({
            method: 'gdata',
            gidlist: [[id, token]],
            namespace: 1,
        }),
    });

    const data = await response.json() as {gmetadata: (GalleryMetaData | GalleryError)[]};
    return data.gmetadata[0];
}
