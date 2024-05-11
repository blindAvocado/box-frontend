<script setup lang="ts">

const props = defineProps<{
  count: number,
  label: string,
  ratio: number,
}>();

</script>

<template>
  <div class="profile-wasted">
    <div class="profile-wasted__label">
      <span class="profile-wasted__label-value">{{ count }}</span>
      <span class="profile-wasted__label-name">{{ label }}</span>
    </div>
    <div class="profile-wasted__progress">
      <div class="profile-wasted__progress-value" :style="{ width: `${ratio}%` }"></div>
    </div>
  </div>
</template>

<style lang="scss">
.profile-wasted {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__label {
    display: flex;
    align-items: baseline;
    gap: 5px;

    &-value {
      font-size: 18px;
      font-weight: 400;
      line-height: 1;
      color: color("text", "base");
    }

    &-name {
      font-size: 16px;
      font-weight: 400;
      line-height: 1;
      color: color("text", "4");
    }
  }

  &__progress {
    height: 2px;
    margin-top: 2px;
    background-color: color("border", "base");
  }

  &__progress-value {
    height: 100%;
    background-color: color("accent", "base");
  }
}
</style>