export function normalizeEpisodeMarking(season: number, episode: number): string {
  const seasonStr: string = season < 10 ? `s0${season}` : `s${season}`
  const episodeStr: string = episode < 10 ? `e0${episode}` : `e${episode}`

  return seasonStr + episodeStr;
}
