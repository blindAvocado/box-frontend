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

const expandedSeasons = ref<number[]>([1]);

const groupedEpisodes = computed(() => {
  let res: Record<number, SeasonWithEpisodes> = {};

  for (const season of props.seasons) {
    const episodes = props.episodes.filter(episode => episode.seasonNumber === season.number);
    res[season.number] = {...season, episodeList: episodes};
  }

  return res;
})

</script>

<template>
  <ul class="seasons">
    <li
      v-for="season in groupedEpisodes"
      :key="season.id"
      class="seasons__item"
      :class="{ 'seasons__item--active': expandedSeasons.includes(season.number) }"
    >
      <button class="season-btn">{{ `Сезон ${season.number}` }}</button>
      <ul class="episodes">
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
}

.seasons__item {
  &--active .episodes {
    max-height: 600px;
  }
}

.season-btn {
}

.episodes {
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
}

.episodes__item {
}
</style>
