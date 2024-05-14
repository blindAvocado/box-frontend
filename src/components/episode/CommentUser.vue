<script setup lang="ts">
import type { ICommentOwner } from '~/types/episode';

const props = defineProps<{
  user: ICommentOwner,
  date: string,
  commentId: number,
}>();

const dateFormatted = convertISODateToString(props.date);

const onAnchorClick = () => {

}
</script>

<template>
  <div class="user-comment">
    <NuxtLink :to="`/user/${user.id}`" class="profile">
      <NuxtPicture
        v-if="user.avatar"
        :src="user.avatar"
        :width="32"
        :height="32"
        sizes="sm:30px"
        :placeholder="[32, 32, 75, 5]"
      />
      <svg-icon v-else name="profile" />
    </NuxtLink>
    <span class="details">
      <NuxtLink :to="`/user/${user.id}`" class="name">{{ user.username }}</NuxtLink>
      <span class="date">{{ dateFormatted }}</span>
      <a :href="`#c${commentId}`" class="anchor">#</a>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.user-comment {
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
  flex-wrap: wrap;
  align-items: center;
  // flex-direction: column;
  gap: 3px;
}

.name {
  flex: 1 0 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  color: color("text", "base");
}

.date {
  display: flex;
  font-size: 14px;
  font-weight: 300;
  line-height: 1;
  color: color("text", "4");
}

.anchor {
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  line-height: 1;
  margin-left: 5px;
  color: color("text", "4");

  &:hover {
    color: color("text", "base");
  }
}
</style>