<script setup lang="ts">
import type { IEpisode, ISeason } from '~/types/show';
import EpisodesList from '~/components/show/tabs/EpisodesList.vue';
import Checkbox from '~/components/base/Checkbox.vue';

const props = defineProps<{
  seasons: ISeason[];
  episodes: IEpisode[];
}>();

const episodesList = ref<InstanceType<typeof EpisodesList>>();
const groupBySeason = ref<boolean>(false);
const sortBy = ref<'ASC' | 'DESC'>('DESC');

const isCollapsed = computed(() => {
  return !episodesList.value?.expandedSeasons.length
})

const toggleGroup = () => {
  groupBySeason.value = !groupBySeason.value
}

const toggleCollapse = () => {
  if (!episodesList.value) {
    return;
  }

  if (isCollapsed.value) {
    episodesList.value.expandedSeasons = [...Array(props.seasons.length+1).keys()].slice(1);
  } else {
    episodesList.value.expandedSeasons = [];
  }
}

</script>

<template>
  <div class="episodes">
    <div class="tools">
      <Checkbox
        :value="groupBySeason"
        :id="'groupBySeason'"
        label="Группировать по сезонам"
        @click="toggleGroup"
      />
      <button
        @click.prevent="toggleCollapse"
        class="collapse-expand"
      >
        <svg-icon :name="isCollapsed ? 'expand' : 'collapse'" />
      </button>
    </div>
    <EpisodesList ref="episodesList" :seasons :episodes />
  </div>
</template>

<style lang="scss" scoped>
.tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .collapse-expand {
    color: color("text", "5");
    transition: all 0.3s $easing;

    &:hover {
      color: color("text", "3");
    }

    :deep(svg) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
