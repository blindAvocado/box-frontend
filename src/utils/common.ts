export function normalizeBigNumbers(num: number): string {
  const million = num / 1000000;
  const thousand = num / 1000;

  if (Math.floor(million) > 0) {
    return `${million.toFixed(1)}M`
  }

  if (Math.floor(thousand) > 0) {
    return `${thousand.toFixed(1)}K`
  }

  return `${num}`
}

export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}