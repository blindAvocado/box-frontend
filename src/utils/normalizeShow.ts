import type { IShow } from "~/types/show";

export function normalizeShowAirYears(dateStarted: string, dateEnded?: string): string {
  const start: Date = new Date(dateStarted);
  let end: Date;
  
  let res = `${start.getFullYear()}`;

  if (dateEnded) {
    end = new Date(dateEnded);
    if (start.getFullYear() !== end.getFullYear()) {
      res += `-${end.getFullYear()}`
    }
  } else {
    res += `-н.в.`
  }

  return res;
}

export function normalizeShowAirDate(dateStarted: string, dateEnded?: string): string {
  const start: Date = new Date(dateStarted);
  let end: Date;
  
  let res = `${withLeadingZero(start.getDate())}.${withLeadingZero(start.getMonth() + 1)}.${start.getFullYear()}`;

  if (dateEnded) {
    end = new Date(dateEnded);
    res += ` — ${withLeadingZero(end.getDate())}.${withLeadingZero(end.getMonth() + 1)}.${end.getFullYear()}`;
  } else {
    res += ` — н.в.`;
  }

  return res;
}

export function normalizeShowTotalRuntime(totalRuntime: number): string {
  const days = Math.floor(totalRuntime / (60 * 24));
  const hours = Math.floor((totalRuntime % (60 * 24)) / 60);
  const remainingMinutes = totalRuntime % 60;

  let result = '';

  if (days > 0) {
    result += days + ' дней ';
  }

  if (hours > 0) {
    result += hours + ' часов ';
  }

  if (remainingMinutes > 0) {
    result += remainingMinutes + ' минут';
  }

  return result;
}

export function normalizeShowDetails(properties: IShow['properties']) {
  const res = [];

  if (properties.dateStarted) {
    res.push({
      label: "Дата показа",
      value: normalizeShowAirDate(properties.dateStarted, properties.dateEnded),
    });
  }

  res.push({
    label: "Страна",
    value: properties.countries.join(", "),
  });

  res.push({
    label: "Канал",
    value: properties.network.name,
    link: `/network/${properties.network.id}`,
  });

  res.push({
    label: `${properties.genres.length > 1 ? "Жанры" : "Жанр"}`,
    value: properties.genres.map(genre => genre.name).join(", "),
  });

  if (properties.averageRuntime) {
    res.push({
      label: "Длительность серии",
      value: `${properties.averageRuntime} мин.`,
    });
  }

  if (properties.totalRuntime) {
    res.push({
      label: "Общее время",
      value: normalizeShowTotalRuntime(properties.totalRuntime),
    });
  }

  res.push({
    label: "Количество серий",
    value: properties.episodes,
  });

  return res;
}