export interface Show {
  id: number;
  title: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  properties: Properties;
  actors: Actor[];
  community: Community;
  bestEpisodes?: BestEpisode[];
  seasons: Season[];
  episodes: Episode[];
}

interface Properties {
  dateStarted?: string;
  dateEnded?: string;
  airStatus: string;
  countries: string[];
  network: Network;
  genres: Genre[];
  averageRuntime?: number;
  totalRuntime: number;
  episodes: number;
  seasons: number;
}

interface Network {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Actor {
  id: number;
  name: string;
  profilePath?: string;
  character?: string;
  order?: number;
}

interface Community {
  watching: number;
  lists: number;
  favorite: number;
  rating: ShowRating;
}

interface ShowRating {
  native: Rating;
  imdb: Rating;
  kinopoisk?: Rating;
}

interface Rating {
  average: number;
  votes: number;
}


interface BestEpisode {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
  rating: number;
  title: string;
}

interface Season {
  id: number;
  number: number;
  episodes: number;
  airdate: string;
  rating: number;
  name: string;
  posterPath?: string;
}

interface Episode {
  id: number;
  episodeNumber: number;
  seasonNumber: number;
  name: string;
  showId: number;
  rating: Rating;
  personal: Personal;
}

interface Personal {
  watched: boolean;
  rating?: number;
  favorite?: boolean;
}
