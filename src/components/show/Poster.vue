<script setup lang="ts">

defineProps<{
  poster: string
}>();

</script>

<template>
  <div v-if="poster" class="poster">
    <NuxtImg
      :src="poster"
      height="345"
      densities="x1 x2"
      :placeholder="[230, 345, 75, 5]" 
    />
  </div>
</template>

<style lang="scss" scoped>
.poster {
  position: relative;
  display: flex;
  min-width: 230px;
  border-radius: 10px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: inset 0 0 10px 1px rgba(255, 255, 255, 0.2);
  }
}
</style>
