<script setup lang="ts">
import type { IProfileShowCard } from '~/types/profile';
import AirStatus from '../show/AirStatus.vue';
import StarRating from '../base/StarRating.vue';
import ProgressBar from '../base/ProgressBar.vue';

withDefaults(
  defineProps<{
    show: IProfileShowCard,
    isOwner: boolean,
  }>(),
  {
    isOwner: false,
  }
)

</script>

<template>
  <div class="show-card">
    <div class="show-card__banner">
      <NuxtLink :to="`/show/${show.id}`">
        <NuxtPicture
          :src="show.bannerPath"
          :width="130"
        />
      </NuxtLink>
    </div>
    <div class="show-card__main">
      <div class="show-card__header">
        <NuxtLink :to="`/show/${show.id}`">
          <span class="show-card__header-title">{{ show.title }}</span>
        </NuxtLink>
        <AirStatus :status="show.airStatus" />
      </div>
      <StarRating :value="show.rating" :readonly="!isOwner" :height="20" />
      <ProgressBar :ratio="(show.watchedEpisodes / show.totalEpisodes) * 100" class="show-card__progress">
        <span class="watched">{{ show.watchedEpisodes }}</span>
        <span class="total">/{{ show.totalEpisodes }}</span>
      </ProgressBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show-card {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  &__banner {
    border-radius: 3px;
    overflow: hidden;
    width: 130px;
    aspect-ratio: 16 / 9;
    height: auto;
    flex-shrink: 0;

    a {
      display: flex;
      height: 100%;
    }

    picture {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
    }

    picture img {
      object-fit: cover;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    padding: 4px 0;
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  &__header-title {
    font-size: 18px;
    line-height: 1;
    color: color("text", "1");
  }
  
  &__progress {
    position: relative;

    :deep(.progress-bar__label) {
      display: inline;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(-100%);
      font-size: 14px;
      line-height: 1;
      color: color("text", "3");
    }

    .watched {
      color: color("accent");
    }
  }
}
</style>