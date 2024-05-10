<script setup lang="ts">
import type { IUserRating } from '~/types/show';
import StarRating from '../base/StarRating.vue';

defineProps<{
  user: IUserRating,
}>();

</script>

<template>
  <NuxtLink :to="`/user/${user.id}`" class="user-rating">
    <span class="profile">
      <NuxtPicture
        v-if="user.avatar"
        format="avif,webp,jpg"
        :src="user.avatar"
        :width="32"
        :height="32"
        sizes="sm:30px"
        :placeholder="[32, 32, 75, 5]"
      />
      <svg-icon v-else name="profile" />
    </span>
    <span class="details">
      <span class="name">{{ user.username }}</span>
      <StarRating :value="user.rating" :height="18" :readonly="true" />
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.user-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;

  svg,
  picture {
    width: 32px;
    height: 32px;
    color: color("text", "3");
  }

  :deep(source),
  :deep(img) {
    object-fit: cover;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.name {
  font-size: 16px;
  font-weight: 300;
  color: color("text", "3");
}
</style>