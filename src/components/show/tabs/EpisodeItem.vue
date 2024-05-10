<script setup lang="ts">
import Checkbox from '~/components/base/Checkbox.vue';
import StarRating from '~/components/base/StarRating.vue';
import type { Episode } from '~/types/show';

const user = useUser();

const props = defineProps<{
  episode: Episode;
}>();

const localWatched = ref(props.episode?.personal?.watched);
const localRating = ref(props.episode?.personal?.rating ?? 0);

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

watch(localWatched, (val) => {
  console.log("🚀 ~ watch ~ val:", val)
})

</script>

<template>
  <div class="episode-item">
    <div class="number">{{ episode.episodeNumber }}</div>
    <NuxtLink :to="`/show/${episode.showId}/episode/${episode.id}`" class="title">{{ episode.name }}</NuxtLink>
    <div class="tools">
      <div v-if="episode.comments" class="comments">
        <span>{{ episode.comments }}</span>
        <svg-icon name="comment" />
      </div>
      <div class="date">{{ episode.airdate }}</div>
      <StarRating
        :value="localRating"
        :height="22"
        @rate="onRated"
        @reset="onReset"
      />
      <Checkbox
        v-if="user.loggedIn"
        :value="localWatched"
        @click="onWatchClick"
        :id="`${episode.id}`"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.episode-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 12px;
  border-bottom: 1px solid color("border", "1");
}

.number {
  width: 20px;
  font-size: 14px;
  color: color("text", "3");
}

.title {
  flex: 1 1 30%;
  max-width: 55%;
  font-size: 15px;
  color: color("text", "base");

  &:hover {
    color: color("accent", "6");
  }
}

.tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex: 1 0;

  .comments {
    width: 45px;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: color("text", "4");

    :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }

  .date {
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
    color: color("text", "4");
  }
}
</style>
