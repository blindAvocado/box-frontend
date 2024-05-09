<script setup lang="ts">
import type { Community } from '~/types/show';

import { normalizeBigNumbers } from '~/utils/common';

defineProps<{
  community: Community
}>();

const route = useRoute();

</script>

<template>
  <div class="community">
    <NuxtLink :to="`/show/${$route.params.id}/members`" class="community__item watching">
      <nuxt-icon name="eye"/>
      <div class="community__value">{{ normalizeBigNumbers(community.watching) }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.id}/lists`" class="community__item lists">
      <nuxt-icon name="list"/>
      <div class="community__value">{{ normalizeBigNumbers(community.lists) }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.id}/likes`" class="community__item favorites">
      <nuxt-icon name="heart"/>
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
    font-size: 12px;
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
