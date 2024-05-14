import type { IEpisodePage } from "~/types/episode";

export function normalizeEpisodeMarking(season: number, episode: number): string {
  const seasonStr: string = season < 10 ? `s0${season}` : `s${season}`
  const episodeStr: string = episode < 10 ? `e0${episode}` : `e${episode}`

  return seasonStr + episodeStr;
}

export function normalizeEpisodeDetails(properties: IEpisodePage) {
  const res = [];

  res.push({
    label: "Длительность",
    value: `${properties.runtime} мин.`,
  });

  res.push({
    label: "Дата показа",
    value: properties.airdate,
  });

  if (properties.personal?.watchedDate) {
    res.push({
      label: "Дата просмотра",
      value: properties.personal?.watchedDate,
    });
  }

  res.push({
    label: "Всего просмотров",
    value: numberWithSpaces(properties.watched),
  });

  return res;
}

export function normalizeEpisodeAirDate(dateAired: string): string {
  const start: Date = new Date(dateAired);
  
  let res = `${withLeadingZero(start.getDate())}.${withLeadingZero(start.getMonth() + 1)}.${start.getFullYear()}`;

  return res;
}