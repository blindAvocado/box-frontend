<script setup lang="ts">
import type { Episode, Season } from '~/types/show';
import EpisodesList from '~/components/show/tabs/EpisodesList.vue';
import Checkbox from '~/components/base/Checkbox.vue';

const props = defineProps<{
  seasons: Season[];
  episodes: Episode[];
}>();

const episodesList = ref<InstanceType<typeof EpisodesList>>();
const isCollapsed = ref<boolean>(false);
const groupBySeason = ref<boolean>(false);
const sortBy = ref<'ASC' | 'DESC'>('DESC');

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

  isCollapsed.value = !isCollapsed.value
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
      <button class="collapse-expand" @click.prevent="toggleCollapse">
        <nuxt-icon :name="isCollapsed ? 'expand' : 'collapse'" />
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
