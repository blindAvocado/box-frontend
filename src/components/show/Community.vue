<script setup lang="ts">
import type { ICommunity } from '~/types/show';

defineProps<{
  community: ICommunity
}>();

const route = useRoute();

</script>

<template>
  <div v-if="community" class="community">
    <NuxtLink :to="`/show/${$route.params.show_id}/members`" class="community__item watching">
      <svg-icon name="eye"/>
      <div class="community__value">{{ normalizeBigNumbers(community.watching) }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.show_id}/lists`" class="community__item lists">
      <svg-icon name="list"/>
      <div class="community__value">{{ normalizeBigNumbers(community.lists) }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.show_id}/likes`" class="community__item favorites">
      <svg-icon name="heart"/>
      <div class="community__value">{{ normalizeBigNumbers(community.favorite) }}</div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.community {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &__item {
    display: flex;
    align-items: center;
    gap: 3px;

    &:hover .community__value {
      color: color("text", "base");
    }

    :deep(span) {
      display: flex;
    }

    :deep(svg) {
      width: 18px;
      height: 18px;
    }
  }

  &__value {
    font-size: 13px;
    font-weight: 300;
    color: color("text", "4");
    transition: all 0.3s $easing;
  }

  .watching :deep(svg) {
    color: color("elements", "mint");
  }

  .lists :deep(svg) {
    color: color("elements", "blue");
  }

  .favorites :deep(svg) {
    color: color("elements", "orange");
  }
}
</style>
