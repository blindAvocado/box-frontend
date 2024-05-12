<script setup lang="ts">
import type { ISocials, IStats, IUser, IWasted } from '~/types/profile';
import ProgressBar from '../base/ProgressBar.vue';

const props = defineProps<{
  wasted: IWasted,
  socials: ISocials | undefined,
  stats: IStats,
  user: IUser,
}>();

</script>

<template>
  <div class="profile-header">
    <div class="profile-header__main">
      <div class="profile-header__avatar">
        <NuxtPicture v-if="user.avatar" format="avif,webp,jpg" :src="user.avatar" :width="120" :height="120"
          sizes="md:120px" :placeholder="[120, 120, 75, 5]" />
        <svg-icon v-else name="profile" />
      </div>
      <div class="profile-header__info">
        <div class="profile-header__top">
          <h1 class="profile-header__username">{{ user.username }}</h1>
          <div v-if="socials" class="profile-header__socials">
            <a v-if="socials.vk" :href="`https://vk.com/${socials.vk}`" target="_blank" class="profile-header__link">
              <nuxt-icon name="vk" />
            </a>
            <a v-if="socials.telegram" :href="`https://t.me/${socials.telegram}`" target="_blank"
              class="profile-header__link">
              <nuxt-icon name="telegram" />
            </a>
          </div>
        </div>
        <div class="profile-header__wasted">
          <ProgressBar
            :ratio="(wasted.watchedEpisodes / wasted.totalEpisodes) * 100"
            class="profile-header__wasted--episodes"
          >
            <span class="value">{{ wasted.watchedEpisodes }}</span>
            <span class="name">эпизодов</span>
          </ProgressBar>

          <ProgressBar
            :ratio="(wasted.watchedHours / wasted.totalHours) * 100"
            class="profile-header__wasted--hours"
          >
            <span class="value">{{ wasted.watchedHours }}</span>
            <span class="name">часов</span>
          </ProgressBar>

          <ProgressBar
            :ratio="(wasted.watchedDays / wasted.totalDays) * 100"
            class="profile-header__wasted--days"
          >
            <span class="value">{{ wasted.watchedDays }}</span>
            <span class="name">дней</span>
          </ProgressBar>
        </div>
      </div>
    </div>
    <ul class="profile-header__stats">
      <li class="profile-header__stat">
        <NuxtLink class="profile-header__stat-link">
          <span class="profile-header__stat-value">{{ stats.episodesThisYear }}</span>
          <span class="profile-header__stat-label">Серий в этом году</span>
        </NuxtLink>
      </li>
      <li class="profile-header__stat">
        <NuxtLink class="profile-header__stat-link">
          <span class="profile-header__stat-value">{{ stats.lists }}</span>
          <span class="profile-header__stat-label">Списков</span>
        </NuxtLink>
      </li>
      <li class="profile-header__stat">
        <NuxtLink class="profile-header__stat-link">
          <span class="profile-header__stat-value">{{ stats.following }}</span>
          <span class="profile-header__stat-label">Слежу</span>
        </NuxtLink>
      </li>
      <li class="profile-header__stat">
        <NuxtLink class="profile-header__stat-link">
          <span class="profile-header__stat-value">{{ stats.followed }}</span>
          <span class="profile-header__stat-label">Следят</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__main {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    
    picture img {
      object-fit: cover;
      width: 100%;
      height: auto;
    }

    picture {
      width: 100%;
      height: 100%;
      display: flex;
    }
  }

  &__info {
    width: 350px;
  }

  &__top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__username {
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
    color: color("text", "1");
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: 15px;
  }

  &__link {
    color: color("text", "4");

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__wasted {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .value {
      font-size: 18px;
      font-weight: 400;
      line-height: 1;
      color: color("text", "base");
    }

    .name {
      font-size: 16px;
      font-weight: 400;
      line-height: 1;
      color: color("text", "4");
    }
  }

  &__wasted--episodes .progress-bar__progress-value {
    background-color: color("elements", "red");
  }

  &__wasted--hours .progress-bar__progress-value {
    background-color: color("elements", "mint");
  }
  
  &__wasted--days .progress-bar__progress-value {
    background-color: color("accent", "base");
  }

  &__stats {
    list-style: none;
    display: flex;
    align-items: center;
  }

  &__stat {
    &:not(:first-child) {
      border-left: 1px solid color("border", "base");
    }
  }

  &__stat-link {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__stat-value {
    font-size: 24px;
    font-weight: 500;
    line-height: 1;
    color: color("text", "3");
  }

  &__stat-label {
    font-size: 14px;
    font-weight: 300;
    line-height: 1;
    color: color("text", "4");
  }
}
</style>