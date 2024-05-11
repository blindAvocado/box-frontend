<script setup lang="ts">
import { NuxtLink } from "#components";

withDefaults(
  defineProps<{
    title: string;
    items?: any[];
    link?: string;
    showCount?: boolean;
    count?: number;
  }>(),
  {
    showCount: false,
    number: 0,
  }
);
</script>

<template>
  <div class="sideblock">
    <div class="header">
      <component
        :is="link ? NuxtLink : 'div'"
        :to="link"
        class="header__wrapper"
      >
        <span class="title">{{ title }}</span>
        <span v-if="showCount" class="count">{{ count }}</span>
      </component>
    </div>
    <div class="body">
      <ul v-if="items?.length" class="list">
        <li v-for="(item, index) in items" :key="index" class="item">
          <slot :item="item"></slot>
        </li>
      </ul>
      <template v-else>
        <slot name="single"></slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 5px;
    border-bottom: 1px solid color("border", "3");
  }
  
}

.title {
  color: color("text", "3");
  font-weight: 500;
  font-size: 16px;
}

.count {
  color: color("text", "4");
  font-weight: 300;
  font-size: 12px;
}

.title,
.count {
  transition: all 0.2s $easing;

  a.header__wrapper:hover & {
    color: color("text", "base");
  }
}

.body {
  margin-top: 5px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.item {
  display: flex;
}
</style>
