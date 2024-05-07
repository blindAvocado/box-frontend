<script setup lang="ts">
import type { Episode } from '~/types/show';

defineProps<{
  episode: Episode;
}>();

</script>

<template>
  <div class="episode-item">
    <div class="number">{{ episode.episodeNumber }}</div>
    <NuxtLink :to="`/show/${episode.showId}/episode/${episode.id}`" class="title">{{ episode.name }}</NuxtLink>
    <div class="tools">
      <div v-if="episode.comments" class="comments">
        <span>{{ episode.comments }}</span>
        <nuxt-icon name="comment" />
      </div>
      <div class="date">{{ episode.airdate }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.episode-item {
  display: flex;
  align-items: center;
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
}
.tools {
}
.comments {
}
.date {
}
</style>
