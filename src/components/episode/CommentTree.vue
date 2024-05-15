<script setup lang="ts">
import type { IComment } from '~/types/episode';
import CommentItem from './CommentItem.vue';


const props = defineProps<{
  comments: IComment[]
}>();

</script>

<template>
  <ul class="comment-tree">
    <li v-for="comment in comments" :key="comment.id" class="comment-tree__item">
      <CommentItem :comment />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.comment-tree {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__item {
  }
}
</style>