<script setup lang="ts">
import type { IComment } from '~/types/episode';
import CommentField from './CommentField.vue';
import CommentTree from './CommentTree.vue';

const route = useRoute();

const props = defineProps<{
  comments: IComment[] | undefined,
  open: boolean
}>();

const localOpen = ref<boolean>(props.open ?? false);

const commentsList = ref<IComment[] | undefined>(props.comments);
const commentField = ref<InstanceType<typeof CommentField>>();

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

const onSubmitComment = async (text: string) => {
  const data = await useFetchAuth(`http://127.0.0.1:8000/api/episode/${route.params.episode_id}/comment`, {
    method: "POST",
    body: JSON.stringify({ body: text }), 
  });

  if (commentField.value) {
    commentField.value.commentText = "";
  }

  commentsList.value?.push(data as IComment);
}

</script>

<template>
  <div class="comments">
    <div class="comments__header">
      <h3 class="comments__title">Комментарии</h3>
      <span v-if="commentsCount" class="comments__count">{{ commentsCount }}</span>
    </div>
    <div v-if="!localOpen && commentsList?.length" class="comments__closed">
      <div class="comments__spoiler">Комментарии скрыты, так как в них могут содержаться спойлеры</div>
      <BaseButton @on-click="onOpenComments" class="comments__open">Показать комментарии</BaseButton>
    </div>
    <div v-else class="comments__opened">
      <CommentTree v-if="commentsList?.length" :comments="commentsList" />
      <div v-else class="comments__empty">Комментариев пока нет, и Вы можете оставить первый!</div>
      <div class="comments__new">
        <div class="comments__new-title">Написать комментарий</div>
        <CommentField ref="commentField" @add-comment="onSubmitComment" />
      </div>
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

  &__spoiler {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__open {
    max-width: 400px;
  }

  &__new {
    margin-top: 20px;
    
    &-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
}
</style>