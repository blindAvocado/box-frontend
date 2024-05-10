<script setup lang="ts">
import type { IShowCard } from '~/types/show';
import StarRating from '../base/StarRating.vue';
import AirStatus from '../show/AirStatus.vue';

defineProps<{
  show: IShowCard;
}>();

</script>

<template>
  <NuxtLink :to="`/show/${show.id}`" class="card-show-banner">
    <NuxtPicture
      :src="show.bannerPath"
      :width="230"
      :height="130"
      :placeholder="[230, 130, 50, 5]"
      sizes="md:230px"
      format="avif,webp"
      class="banner"
    />
    <span class="header">
      <span class="title">{{ show.title }}</span>
      <AirStatus :status="show.airStatus" class="airstatus" />
    </span>
    <StarRating v-if="show.rating" :value="3" :readonly="true" :height="18" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
.card-show-banner {
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: flex-start;
}

.banner {
  max-width: 230px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 5px;
  margin-bottom: 5px;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: color("text", "3");
}
</style>