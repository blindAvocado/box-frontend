export function normalizeBigNumbers(num: number): string {
  const million = num / 1000000;
  const thousand = num / 1000;

  if (Math.floor(million) > 0) {
    return `${million.toFixed(1)}M`;
  }

  if (Math.floor(thousand) > 0) {
    return `${thousand.toFixed(1)}K`;
  }

  return `${num}`;
}

export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function convertISOTOString(isoString: string) {
  let date = new Date(isoString);
  let monthNames = ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."];

  return `${("0" + date.getDate()).slice(-2)} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}
