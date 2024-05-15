import type { NitroFetchOptions } from "nitropack";

export const useFetchAuth = (url: string, opts?: NitroFetchOptions<string>) => {
  const token = getCookie("access_token");

  const headers: HeadersInit = {
    ...(opts?.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return $fetch(url, { ...opts, headers });
};