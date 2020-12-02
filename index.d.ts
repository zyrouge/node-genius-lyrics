import * as Axios from "axios";

export interface Config {
    requestOptions: Axios.AxiosRequestConfig;
}

export class Client {
    key?: string;
    songs: SongsClient;
    artists: ArtistsClient;

    constructor(key?: string, config?: Config);
}

export class SongsClient {
    key?: string;

    constructor(key?: string, config?: Config);

    search(q: string): Promise<Song[]>;
    get(q: number): Promise<Song>;
}

export class ArtistsClient {
    key?: string;

    constructor(key?: string, config?: Config);

    get(q: number): Promise<Artist>;
}

export class Song {
    title: string;
    fullTitle: string;
    featuredTitle: string;
    id: number;
    thumbnail: string;
    image: string;
    url: string;
    endpoint: string;
    artist?: Artist;
    partial: boolean;
    album?: Album;
    releasedAt?: Date;
    raw: any;
    key?: string;

    constructor(res: any, key?: string, partial?: boolean, config?: Config);

    lyrics(removeChorus?: boolean): Promise<string>;
    fetch(): Promise<Song>;
}

export class Artist {
    name: string;
    id: number;
    url: string;
    thumbnail: string;
    image: string;
    iq: number;
    verified: {
        normal: boolean;
        meme: boolean;
    }
    partial: boolean;
    socialmedia: {
        facebook?: string;
        twitter?: string;
    }
    raw: any;
    key?: string;

    constructor(res: any, key?: string, partial?: boolean, config?: Config);

    songs(options?: {
        per_page?: number;
        sort?: "title" | "popularity";
        page: number;
    }): Promise<Song[]>;
    fetch(): Promise<Artist>;
}

export class Album {
    name: string;
    title: string;
    id: number;
    image: string;
    url: string;
    endpoint?: string;
    artist: Artist;
    partial: boolean;
    raw: any;

    constructor(res: any, artist: Artist, config?: Config);
}

export const Constants: string;

export const Version: string;