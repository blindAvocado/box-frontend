<script setup lang="ts">
import type { IComment } from '~/types/episode';
import CommentField from './CommentField.vue';


const props = defineProps<{
  comments: IComment[] | undefined,
  open: boolean
}>();

const localOpen = ref<boolean>(props.open ?? false);

const commentsCount = computed(() => {
  if (!props.comments?.length) {
    return 0;
  }

  let totalCount = 0;
  props.comments.forEach(comment => {
    totalCount += countComments(comment);
  });

  return totalCount;
});

const onOpenComments = () => {
  localOpen.value = true;
}

const countComments = (obj: any, count: number = 0): number => {
  if (obj.hasOwnProperty('body')) {
    count++;
  }
  if (obj.hasOwnProperty('subcomment')) {
    count = countComments(obj.subcomment, count);
  }
  return count;
}

</script>

<template>
  <div class="comments">
    <div class="comments__header">
      <h3 class="comments__title">Комментарии</h3>
      <span v-if="commentsCount" class="comments__count">{{ commentsCount }}</span>
    </div>
    <div v-if="!localOpen" class="comments__closed">
      <div class="comments__spoiler">Комментарии скрыты, так как в них могут содержаться спойлеры</div>
      <button type="button" class="comments__open" @click.prevent="onOpenComments">Показать комментарии</button>
    </div>
    <div v-else class="comments__opened">
      <CommentField />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comments {
  &__header {
    display: flex;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    color: color("text", "base");
  }

  &__count {
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    color: color("text", "4");
    margin-left: 3px;
  }

  &__closed {
  }

  &__spoiler {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__open {
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    background-color: color("accent", "base");
    font-size: 20px;
    font-weight: 700;
    color: #554300;
  }
}
</style>