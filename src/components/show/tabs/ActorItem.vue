<script setup lang="ts">
import type { IActor } from '~/types/show';

defineProps<{
  actor: IActor;
}>()

</script>

<template>
  <NuxtLink :to="`/actor/${actor.id}`" class="actor">
    <span class="profile">
      <NuxtImg
        v-if="actor.profilePath"
        :src="actor.profilePath"
        :width="60"
        :height="60"
        :placeholder="[60, 60, 75, 5]"
      />
    </span>
    <span class="details">
      <span class="name">{{ actor.name }}</span>
      <span v-if="actor.character" class="character">{{ actor.character }}</span>
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.actor {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile {
  border-radius: 50%;
  overflow: hidden;
  height: 60px;

  img {
    height: 100%;
    object-fit: cover
  }
}

.details {
  display: flex;
  flex-direction: column
}

.name {
  font-size: 16px;
  color: color("text", "base");
  transition: all 0.3s $easing;

  .actor:hover & {
    color: color("text", "1");
  }
}

.character {
  font-size: 14px;
  line-height: 1;
  color: color("text", "4");
}
</style>
