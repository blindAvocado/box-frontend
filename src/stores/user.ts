import { defineStore } from 'pinia';

interface User {
  username: string,
  loggedIn: boolean,
  moderator?: boolean,
  avatar?: string,
}

export const useUser = defineStore('user', {
  actions: {
    async fetchUserData() {
      try {
        const resp = await fetch(import.meta.env.VITE_FOLDER_PATH + 'mock/userdata.json').then(resp => resp.json());

        this.username = resp.username;
        this.loggedIn = true;
        this.moderator = resp.moderator;
        this.avatar = resp.avatar;

      } catch (e) {
        console.error(e);
      }
    },
  },
  getters: {

  },
  state(): User {
      return {
        username: "boxer",
        loggedIn: true
      }
  },
});