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
  min-width: 240px;
}
</style>
