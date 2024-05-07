<script setup lang="ts">
import type { Community } from '~/types/show';

defineProps<{
  community: Community
}>();

const route = useRoute();

</script>

<template>
  <div class="community">
    <NuxtLink :to="`/show/${$route.params.id}/members`" class="community__item watching">
      <nuxt-icon name="eye"/>
      <div class="community__value">{{ community.watching }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.id}/lists`" class="community__item lists">
      <nuxt-icon name="list"/>
      <div class="community__value">{{ community.lists }}</div>
    </NuxtLink>
    <NuxtLink :to="`/show/${$route.params.id}/likes`" class="community__item favorites">
      <nuxt-icon name="heart"/>
      <div class="community__value">{{ community.favorite }}</div>
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

    &:hover {
      color: color("text", "2") !important;
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
