import type { IEpisodePersonal, IRating } from "./base"

export interface IEpisodePage {
  id: number
  episodeNumber: number
  seasonNumber: number
  name: string
  overview?: string
  airdate: string
  runtime: number
  showId: number
  showName: string
  stillPath?: string,
  watched: number,
  rating: IRating
  personal: IEpisodePersonal
  comments?: IComment[],
  otherEpisodes: IOtherEpisode[],
}

export interface IOtherEpisode {
  id: number,
  episodeNumber: number,
  seasonNumber: number,
  name: string,
}

export interface IComment {
  id: number
  timestamp: number
  owner: ICommentOwner
  body: ICommentBody
  subcomment: IComment
}

interface ICommentOwner {
  id: number
  name: string
  profilePath?: string
}

interface ICommentBody {
  text: string
  image?: string
}
