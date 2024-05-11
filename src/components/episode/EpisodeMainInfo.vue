<script setup lang="ts">
import { NuxtLink } from '#components';
import type { IEpisodePage, IOtherEpisode } from '~/types/episode';
import Checkbox from '../base/Checkbox.vue';
import StarRating from '../base/StarRating.vue';
import EpisodeComments from './EpisodeComments.vue';

const user = useUser();

const props = defineProps<{
  episode: IEpisodePage,
  otherEpisodes: IOtherEpisode[] | null,
}>();

console.log("🚀 ~ otherEpisodes:", props.otherEpisodes)

const getCurrentEpisode = (): IOtherEpisode | null => {
  return props.otherEpisodes?.find((item) => item.id === props.episode.id) ?? null
}

const getAdjacentEpisode = (adjacency: "prev" | "next"): IOtherEpisode | null => {
  if (!currentEpisode.value) {
    return null;
  }

  const curEpisodeIndex = props.otherEpisodes?.indexOf(currentEpisode.value) ?? -1;
  if (curEpisodeIndex < 0) {
    return null;
  }

  const adjacencyIndex = adjacency === "prev" ? -1 : 1;

  return props.otherEpisodes?.[curEpisodeIndex + adjacencyIndex] ?? null
}

const currentEpisode = ref<IOtherEpisode | null>(getCurrentEpisode());
const prevEpisode = ref<IOtherEpisode | null>(getAdjacentEpisode("prev"));
const nextEpisode = ref<IOtherEpisode | null>(getAdjacentEpisode("next"));

const localWatched = ref(props.episode?.personal?.watched);
const localRating = ref(user.loggedIn ? props.episode?.personal?.rating ?? 0 : props.episode?.rating.average);

const details = computed(() => {
  return normalizeEpisodeDetails(props.episode)
});

const onWatchClick = () => {
  localWatched.value = !localWatched.value;
}

const onReset = () => {
  localRating.value = 0;
}

const onRated = (rating: number) => {
  if (!localWatched.value) {
    localWatched.value = true;
  }
  
  localRating.value = rating;
}
</script>

<template>
  <div class="main">
    <div class="header">
      <h1 class="title">{{ episode.name }}</h1>
      <div class="tools">
        <component
          :is="prevEpisode ? NuxtLink : 'div'"
          :to="`/show/${episode.showId}/episode/${prevEpisode?.id}`"
          class="arrow episode-prev"
          :class="{ 'arrow--disabled': !prevEpisode }"
          :aria-disabled="!prevEpisode"
          aria-label="Предыдущий эпизод"
          name="Предыдущий эпизод"
        >
          <svg-icon name="arrow-right-alt" />
        </component>
        <component
          :is="nextEpisode ? NuxtLink : 'div'"
          :to="`/show/${episode.showId}/episode/${nextEpisode?.id}`"
          class="arrow episode-next"
          :class="{ 'arrow--disabled': !nextEpisode }"
          :aria-disabled="!nextEpisode"
          aria-label="Следующий эпизод"
          name="Следующий эпизод"
        >
          <svg-icon name="arrow-right-alt" />
        </component>
      </div>
    </div>
    <div class="banner-wrapper">
      <NuxtPicture
        v-if="episode.stillPath"
        :src="episode.stillPath"
        format="avif,webp,jpg"
        sizes="lg:800px"
        class="banner"
      />
    </div>
    <div class="episode__rating">
      <Checkbox
        v-if="user.loggedIn"
        :value="localWatched"
        @click="onWatchClick"
        :id="`${episode.id}`"
        class="rating__checkbox"
      />
      <StarRating
        :value="localRating"
        :height="22"
        @rate="onRated"
        @reset="onReset"
        class="rating__stars"
      />
      <div class="rating__community">
        <span class="rating__community-value">{{ episode.rating.average }}</span>
        <span class="rating__community-votes">({{ episode.rating.votes }})</span>
      </div>
    </div>
    <div class="details">
      <li v-for="(detail, index) in details" :key="index" class="detail">
        <div class="label">{{ detail.label }}</div>
        <div class="value__wrapper">
          <div class="value">{{ detail.value }}</div>
        </div>
      </li>
    </div>
    <div class="comments">
      <EpisodeComments :comments="episode.comments" :open="episode.personal.commentsOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  max-width: 800px;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 15px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: color("text", "1");
}

.tools {
  display: flex;
  align-items: center;
  gap: 5px;

  .episode-prev {
    transform: rotate(180deg);
  }

  .arrow {
    width: 32px;
    height: 32px;
  }

  .arrow--disabled {
    color: color("text", "5");
  }

  :deep(svg) {
    width: 32px;
    height: 32px;
  }
}

.banner-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden
}

.banner {
  :deep(source),
  :deep(img) {
    width: 100%;
    height: auto;
  }
}

.episode__rating {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.rating__stars {
  flex: 1 0 auto;
  padding-left: 20px;
}

.rating__community {
  flex: 0 0 45%;

  &-value {
    font-size: 28px;
    font-weight: 500;
    color: color("text", "base");
  }

  &-votes {
    font-size: 16px;
    font-weight: 300;
    color: color("text", "4");
    margin-left: 5px;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 25px;
  border-bottom: 1px solid color("border", "base");

  .detail {
    display: flex;
    align-items: center;
  }

  .label {
    display: flex;
    align-items: flex-end;
    color: color("text", "3");
    font-size: 16px;
    line-height: 1.2;
    white-space: nowrap;
    flex: 1 0 55%;

    &::after {
      content: "";
      flex: 0 1 auto;
      width: 100%;
      margin-left: 5px;
      border-bottom: 1px dotted color("border", "base");
    }
  }

  .value__wrapper {
    flex: 1 1 45%;
    display: flex;
  }

  .value {
    flex: 1 1 55%;
    color: color("text", "2");
    font-size: 16px;
    line-height: 1.2;
  }
}

.comments {
  margin-top: 15px;
}
</style>