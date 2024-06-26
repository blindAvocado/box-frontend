export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface ICookieOptions {
  [key: string]: string | boolean | number,
}

export function setCookie(name: string, value: string, options: ICookieOptions = {}) {
  options = {
    path: '/',
    ...options
  };

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey as string];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

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

export function withLeadingZero(num: number): string {
  return ("0" + num).slice(-2)
}

export function convertISODateToString(isoString: string) {
  let date = new Date(isoString);
  let monthNames = ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сент.", "окт.", "нояб.", "дек."];

  return `${("0" + date.getDate()).slice(-2)} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}

export function convertISOTimeToString(isoString: string, time: ("h" | "m" | "s")[]) {
  let date = new Date(isoString);

  let res = '';

  if (time.includes("h")) {
    res += withLeadingZero(date.getHours());
  }

  if (time.includes("m")) {
    res += ":" + withLeadingZero(date.getMinutes());
  }

  if (time.includes("s")) {
    res += ":" + withLeadingZero(date.getSeconds());
  }

  return res
}