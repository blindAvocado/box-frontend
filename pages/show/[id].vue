<script setup lang="ts">
import type { Show } from "~/types/show";

const route = useRoute();

const { data: show } = await useFetch<Show>(`/api/show/${route.params.id}`);

if (!show.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

console.log("🚀 ~ onBeforeMount ~ show:", show);
</script>

<template>
  <div v-if="show" class="show">
    <div class="container">
      <h1>{{ show.title }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
