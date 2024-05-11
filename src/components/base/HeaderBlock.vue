<script setup lang="ts">

defineProps<{
  title: string,
  link?: string,
}>();

</script>

<template>
  <div class="block">
    <div class="block__header">
      <span class="block__title">{{ title }}</span>
      <NuxtLink v-if="link" :to="link" class="block__link">
        <slot name="link" />
        <svg-icon name="arrow-right-alt" />
      </NuxtLink>
    </div>
    <div class="block__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    font-weight: 300;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>