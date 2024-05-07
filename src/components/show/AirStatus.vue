<script setup lang="ts">
const props = defineProps<{
  status: "DEAD" | "AIRING" | "PAUSED";
}>();

const statusName = computed((): string => {
  switch (props.status) {
    case "AIRING":
      return "ON AIR";

    case "PAUSED":
      return "PAUSE";

    default:
      return props.status;
  }
});
</script>

<template>
  <span class="airstatus" :class="`airstatus--${status.toLowerCase()}`">{{ statusName }}</span>
</template>

<style lang="scss" scoped>
.airstatus {
  border-radius: 5px;
  padding: 1px 4px;
  font-weight: 500;
  font-size: 8px;
  color: color("text", "base");

  &--dead {
    background-color: #5f5f5f;
  }

  &--airing {
    background-color: color("elements", "green");
  }

  &--paused {
    background-color: transparent;
    border: 1px solid color("text", "base");
  }
}
</style>
