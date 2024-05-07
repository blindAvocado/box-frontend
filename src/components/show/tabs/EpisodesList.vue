<script setup lang="ts">

import type { Episode, Season } from '~/types/show';
import EpisodeItem from '~/components/show/tabs/EpisodeItem.vue';

interface SeasonWithEpisodes extends Season {
  episodeList: Episode[];
}

const props = defineProps<{
  seasons: Season[];
  episodes: Episode[];
}>();

const episodesLists = ref<Record<number, Element | null>>({});
const expandedSeasons = ref<number[]>([1]);

const groupedEpisodes = computed(() => {
  let res: Record<number, SeasonWithEpisodes> = {};

  for (const season of props.seasons) {
    const episodes = props.episodes.filter(episode => episode.seasonNumber === season.number);
    res[season.number] = {...season, episodeList: episodes};
  }

  return res;
})

const onSeasonToggle = (season: number) => {
  if (expandedSeasons.value.includes(season)) {
    expandedSeasons.value = expandedSeasons.value.filter(item => item !== season);
  } else {
    expandedSeasons.value.push(season);
  }

  console.log("🚀 ~ onSeasonToggle ~ expandedSeasons:", expandedSeasons.value)
}

</script>

<template>
  <ul class="seasons">
    <li
      v-for="season in groupedEpisodes"
      :key="season.id"
      class="seasons__item"
      :class="{ 'seasons__item--active': expandedSeasons.includes(season.number) }"
    >
      <button @click.prevent="onSeasonToggle(season.number)" class="season__btn">
        <span class="season__name">{{ `${season.number} сезон` }}</span>
        <nuxt-icon name="arrow-down" />
      </button>
      <ul
        :ref="(el) => episodesLists[season.number] = (el as Element)"
        class="episodes"
        :style="{ 'max-height': expandedSeasons.includes(season.number) ? `${episodesLists[season.number]?.scrollHeight}px` : '0px' }"
      >
        <li
          v-for="episode in season.episodeList"
          :key="episode.id"
          class="episodes__item"
        >
          <EpisodeItem :episode />
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.seasons {
  list-style: none;
  display: flex;
  flex-direction: column;

  &__item--active .season__btn :deep(svg) {
    transform: rotate(180deg);
  }
}

.season {
  &__btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px 12px 0;
    border-top: 1px solid color("border", "base");
    border-bottom: 1px solid color("border", "base");
    color: color("text", "base");
    margin-top: -1px;

    :deep(svg) {
      width: 20px;
      height: 20px;
      transition: all 0.3s $easing;
    }
  }

  &__name {
    font-size: 20px;
    font-weight: 500;
    color: color("text", "base");
  }
}

.episodes {
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  transition: all 0.3s $easing;
}

.episodes__item {
}
</style>
