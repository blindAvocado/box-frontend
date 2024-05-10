<script setup lang="ts">

defineProps<{
  items: {
    label: string,
    link: string,
  }[]
}>();

</script>

<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumbs__item">
        <NuxtLink :to="item.link" class="breadcrumbs__link">{{ item.label }}</NuxtLink>
        <svg-icon
          v-if="index < items.length - 1"
          name="arrow-down"
          class="breadcrumbs__divider"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;

  &__list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__link {
    color: color("text", "4");

    &:hover {
      color: color("text", "base");
    }
  }

  &__divider {
    width: 20px;
    height: 20px;
    transform: rotate(-90deg);
    color: color("text", "4");
  }
}
</style>