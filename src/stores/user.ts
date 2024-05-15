import { defineStore } from "pinia";
import { useFetchAuth } from "~/composables/useFetchAuth";

interface User {
  id: number;
  username: string;
  loggedIn: boolean;
  moderator?: boolean;
  avatar?: string;
}

interface TokenResp {
  accessToken: string,
  accessTokenExpiration: number,
}

export const useUser = defineStore("user", {
  actions: {
    async login(payload: { username: string, password: string }) {
      try {
        const { data } = await useFetch("http://127.0.0.1:8000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const resp = data.value as TokenResp; 

        console.log("🚀 ~ login ~ resp:", resp);
        console.log("🚀 ~ login ~ resp.accessToken:", resp.accessToken)

        setCookie("access_token", resp.accessToken, { 'max-age': resp.accessTokenExpiration })

        // this.username = resp.username;
        this.loggedIn = true;
        // this.moderator = resp.moderator;
        // this.avatar = resp.avatar;
      } catch (e) {
        console.error(e);
      }
    },
    getToken() {
      return getCookie("access_token");
    },
    async logout() {
      useFetchAuth("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST"
      })
    }
  },
  getters: {},
  state(): User {
    return {
      id: 0,
      username: "user",
      loggedIn: true,
    };
  },
});
