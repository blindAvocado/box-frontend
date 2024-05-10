import type { IEpisodePersonal, IRating, IUserRating } from "./base";

export interface IShowPage {
  show: IShow,
  alsoWatched: IShowCard[],
}

export interface IShowCard {
  id: number;
  title: string;
  bannerPath: string;
  rating: number;
  airStatus: TAirStatus;
}

export interface IShow {
  id: number;
  title: string;
  overview?: string;
  tagline?: string;
  posterPath: string;
  backdropPath?: string;
  properties: IProperties;
  actors: IActor[];
  community: ICommunity;
  bestEpisodes?: IBestEpisode[];
  seasons: ISeason[];
  episodes: IEpisode[];
  friends?: IUserRating[];
}

interface IProperties {
  dateStarted?: string;
  dateEnded?: string;
  airStatus: TAirStatus;
  countries: string[];
  network: INetwork;
  genres: IGenre[];
  averageRuntime?: number;
  totalRuntime: number;
  episodes: number;
  seasons: number;
}

type TAirStatus = "DEAD" | "AIRING" | "PAUSED"

interface INetwork {
  id: number;
  name: string;
}

interface IGenre {
  id: number;
  name: string;
}

export interface IActor {
  id: number;
  name: string;
  profilePath?: string;
  character?: string;
  order?: number;
}

export interface ICommunity {
  watching: number;
  lists: number;
  favorite: number;
  rating: IRating;
}

interface IBestEpisode {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
  rating: number;
  title: string;
}

export interface ISeason {
  id: number;
  number: number;
  episodes: number;
  airdate: string;
  rating: number;
  name: string;
  posterPath?: string;
}

export interface IEpisode {
  id: number;
  episodeNumber: number;
  seasonNumber: number;
  name: string;
  showId: number;
  rating: IRating;
  personal: IEpisodePersonal;
  comments?: number;
  airdate: string;
}