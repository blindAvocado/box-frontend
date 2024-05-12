<script setup lang="ts">
import type { IStats, IProfileShowCard } from '~/types/profile';
import ShowHorizontal from '../cards/ShowHorizontal.vue';

const props = defineProps<{
  stats: IStats,
  initShows: IProfileShowCard[]
}>();

const tabs = computed(() => {
  return [
    { label: "Смотрю", value: props.stats.watching },
    { label: "Буду", value: props.stats.goingTo },
    { label: "Перестал", value: props.stats.stopped },
    { label: "Посмотрел", value: props.stats.watchedAll },
  ]
});

const activeTab = ref<number>(0);

const onTabChange = (index: number) => {
  activeTab.value = index;
}

</script>

<template>
  <div class="shows">
    <ul class="shows__tabs">
      <li 
        v-for="(tab, index) in tabs" 
        :key="index" 
        class="shows__tab"
        :class="{ 'shows__tab--active': index === activeTab }"
      >
        <button class="shows__tab-btn" @click.prevent="onTabChange(index)">
          <span class="shows__tab-value">{{ tab.value }}</span>
          <span class="shows__tab-label">{{ tab.label }}</span>
        </button>
      </li>
    </ul>
    <div class="shows__content">
      <ul class="shows__list">
        <li v-for="show in props.initShows" :key="show.id" class="shows__list-item">
          <ShowHorizontal :show />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shows {
  width: 100%;

  &__tabs {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 15px;
    border-bottom: 1px solid color("border", "1");
    margin-bottom: 15px;
  }

  &__tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &:not(:first-child) {
      border-left: 1px solid color("border", "3");
    }

    &--active::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -15px;
      height: 1px;
      width: 100%;
      background-color: color("text", "base");
    }
  }

  &__tab-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: color("text", "3");
    
    &:hover {
      color: color("text", "base");
    }
  }

  &__tab-value {
    font-size: 36px;
    font-weight: 500;
    line-height: 1;
  }

  &__tab-label {
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
  }

  &__content {}

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__list-item {}
}
</style>