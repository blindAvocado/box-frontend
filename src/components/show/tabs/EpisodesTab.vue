<script setup lang="ts">
import type { Episode, Season } from '~/types/show';
import EpisodesList from '~/components/show/tabs/EpisodesList.vue';

const props = defineProps<{
  seasons: Season[];
  episodes: Episode[];
}>();

const groupBySeason = ref<boolean>(false);
const sortBy = ref<'ASC' | 'DESC'>('DESC');

</script>

<template>
  <div class="episodes">
    <div class="tools"></div>
    <EpisodesList :seasons :episodes />
  </div>
</template>

<style lang="scss" scoped></style>
