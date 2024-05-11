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
  createdAt: string
  owner: ICommentOwner
  body: ICommentBody
  subcomment: IComment
}

export interface ICommentOwner {
  id: number
  username: string
  avatar?: string
}

interface ICommentBody {
  text: string
  image?: string
}
