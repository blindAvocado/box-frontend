<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string,
    items: any[],
    isSlider?: boolean,
  }>(),
  {
    isSlider: true,
  }
)
</script>

<template>
  <div class="list-block">
    <div class="list-block__header">{{ title }}</div>
    <ul
      class="list-block__list hide-scrollbar"
      :style="{ 'overflow-x': isSlider ? 'scroll' : 'auto' }"
    >
      <li
        v-for="(item, index) in items"
        :key="index" 
        class="list-block__item"
      >
        <slot :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list-block {
  &__header {
    font-weight: 500;
    font-size: 18px;
    color: color("text", "base");
    margin-bottom: 5px;
  }

  &__list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>