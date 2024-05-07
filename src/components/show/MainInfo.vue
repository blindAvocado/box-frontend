<script setup lang="ts">
import { NuxtLink } from "#components";

import type { Show } from "~/types/show";

import Tabs from "~/components/base/Tabs.vue";
import AirStatus from "~/components/show/AirStatus.vue";
import ActorsList from "~/components/show/tabs/ActorsList.vue";
import EpisodesList from "~/components/show/tabs/EpisodesList.vue";

const props = defineProps<{
  show: Show;
}>();

const selectedTab = ref<string>('episodes');

const showProps = computed(() => {
  return props.show.properties;
});

const details = computed(() => {
  return normalizeShowDetails(showProps.value)
});

const onTabChange = (tabName: string) => {
  selectedTab.value = tabName;
}

const tabs = [
  { label: 'серии', name: 'episodes' },
  { label: 'актеры', name: 'actors' },
  { label: 'описание', name: 'summary' },
]

</script>

<template>
  <div class="main">
    <div class="header">
      <h1 class="title">{{ show.title }}</h1>
      <div v-if="showProps.dateStarted" class="airdate">
        {{ normalizeShowAirYears(showProps.dateStarted, showProps.dateEnded) }}
      </div>
      <AirStatus :status="showProps.airStatus" class="airstatus" />
      <div v-if="show.tagline" class="tagline">{{ show.tagline }}</div>
    </div>
    <ul class="details">
      <li v-for="(detail, index) in details" :key="index" class="detail">
        <div class="label">{{ detail.label }}</div>
        <div class="value__wrapper">
          <component :is="detail.link ? NuxtLink : 'div'" :to="detail.link" class="value">
            {{ detail.value }}
          </component>
        </div>
      </li>
    </ul>
    <Tabs :tabs :selected-tab @change-tab="onTabChange" class="show-tabs">
      <div v-if="selectedTab === 'episodes'" class="episodesTab">
        <EpisodesList :seasons="show.seasons" :episodes="show.episodes"/>
      </div>
      <div v-if="selectedTab === 'actors'" class="actorsTab">
        <ActorsList :actors="show.actors" />
      </div>
      <div v-if="selectedTab === 'summary'" class="summaryTab">
        {{ show.overview }}
      </div>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.header {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 10px;

  .title {
    font-weight: 700;
    font-size: 32px;
    line-height: 1;
    color: color("text", "1");
  }

  .airdate {
    font-weight: 300;
    font-size: 17px;
    line-height: 1;
    color: color("text", "1");
    margin-left: 5px;
  }

  .airstatus {
    margin-left: 5px;
  }

  .tagline {
    flex-basis: 100%;
    font-weight: 300;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: .075em;
    color: color("text", "3");
    margin-top: 10px;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .detail {
    display: flex;
    align-items: center;
  }

  .label {
    display: flex;
    align-items: flex-end;
    color: color("text", "3");
    font-size: 14px;
    line-height: 1.2;
    white-space: nowrap;
    flex: 1 0 45%;

    &::after {
      content: "";
      flex: 0 1 auto;
      width: 100%;
      margin-left: 5px;
      border-bottom: 1px dotted color("border", "base");
    }
  }

  .value__wrapper {
    flex: 1 1 55%;
    display: flex;
  }

  .value {
    flex: 1 1 55%;
    color: color("text", "2");
    font-size: 14px;
    line-height: 1.2;
  }
}

.show-tabs {
  :deep(.summaryTab) {
    font-weight: 300;
    color: color("text", "3");
  }
}
</style>
