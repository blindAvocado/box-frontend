export interface IRating {
  average: number;
  votes: number;
}

export interface IEpisodePersonal {
  watched: boolean
  watchedDate?: string
  rating: number
  favorite: boolean
  commentsOpen: boolean
  friends?: IUserRating[]
}

export interface IUserRating {
  id: number,
  username: string,
  avatar?: string,
  rating: number,
}