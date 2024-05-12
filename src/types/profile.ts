export interface IProfile {
  user: IUser,
  stats: IStats;
  socials?: ISocials;
  wasted: IWasted;
  ratings: IRatings;
  recentLists?: IRecentLists[];
  following?: IUser[];
  activity: IActivity[];
  watching: IProfileShowCard[];
  heatmap: IHeatmap[];
}

interface IRatings {
  "1": number,
  "2": number,
  "3": number,
  "4": number,
  "5": number,
  "4.5": number,
  "3.5": number,
  "2.5": number,
  "1.5": number,
  "0.5": number,
}

export interface IActivity {
  date: string;
  watchedRuntime: number;
  items: IActivityItem[];
}

export interface IActivityItem {
  event: "rated" | "watched" | "status" | "comment";
  value?: number | string;
  date: string;
  target: IActivityTarget;
}

interface IActivityTarget {
  type: "episode" | "show";
  id: number;
  season?: number;
  episode?: number;
  show?: ITargetShow;
  name?: string;
}

interface ITargetShow {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  username: string;
  avatar?: string;
}

export interface IHeatmap {
  date: string;
  count: number;
}

interface IRecentLists {
  id: number;
  title: string;
  count: number;
  items: RecentListItem[];
}

interface RecentListItem {
  type: string;
  id: number;
  posterPath: string;
}

export interface ISocials {
  vk?: string;
  telegram?: string;
}

export interface IStats {
  episodesThisYear: number;
  lists: number;
  following: number;
  followed: number;
  watching: number;
  goingTo: number;
  stopped: number;
  watchedAll: number;
}

export interface IWasted {
  watchedEpisodes: number;
  totalEpisodes: number;
  watchedHours: number;
  totalHours: number;
  watchedDays: number;
  totalDays: number;
}

export interface IProfileShowCard {
  id: number;
  title: string;
  airStatus: "DEAD" | "AIRING" | "PAUSED";
  rating: number;
  watchedEpisodes: number;
  totalEpisodes: number;
  bannerPath: string;
}
