<script setup lang="ts">
import type { IUser } from '~/types/profile';

withDefaults(
  defineProps<{
    user: IUser,
    compact?: boolean,
  }>(), {
    compact: true,
  }
)

</script>

<template>
  <NuxtLink
    v-tooltip="user.username"
    :to="`/user/${user.id}`"
    class="user-card"
  >
    <NuxtPicture
      v-if="user.avatar"
      :src="user.avatar"
      sizes="md:48px"
      format="avif,webp,jpg"
      width="48"
      height="48"
      class="user-card__avatar"
    />
    <svg-icon v-else name="profile" />
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .user-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid color("border");
    color: color("border", "3");

    svg {
      width: 100%;
      height: auto;
    }

    picture {
      display: flex;
      width: 100%;
      height: 100%;
    }

    picture img {
      object-fit: cover;
      width: 100%;
      height: auto;
    }
  }
</style>