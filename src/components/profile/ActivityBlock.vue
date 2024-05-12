<script setup lang="ts">
import type { IActivity } from '~/types/profile';
import ActivityItem from './ActivityItem.vue';

defineProps<{
  activity: IActivity
}>()

</script>

<template>
  <div class="activity-block">
    <div class="activity-block__header">
      <span class="activity-block__day">Сегодня</span>
      <span class="activity-block__wasted">2 часа 10 минут</span>
    </div>
    <ul class="activity-block__items">
      <li v-for="(event, index) in activity.items" :key="index" class="activity-block__item">
        <ActivityItem :event />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.activity-block {
  &__header {
    display: flex;
    align-items: flex-start;
    gap: 5px;
  }

  &__day {
    font-size: 18px;
    font-weight: 500;
  }

  &__wasted {
    font-size: 14px;
    font-weight: 300;
    color: color("text", "4");
  }

  &__items {
    list-style: none;
  }
}
</style>