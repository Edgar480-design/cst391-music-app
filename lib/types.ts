export interface Track {
  id?: number;
  album_id?: number;
  title: string;
  number?: number | null;
  lyrics?: string | null;
  video?: string | null;
  video_url?: string | null;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  description?: string | null;
  year?: number | null;
  image?: string | null;
  tracks?: Track[];
}
