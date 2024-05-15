<script setup lang="ts">
import type { IComment } from '~/types/episode';
import CommentUser from './CommentUser.vue';
import CommentField from './CommentField.vue';

const route = useRoute();

const props = withDefaults(
  defineProps<{
    comment: IComment,
    hasParent?: boolean,
  }>(),
  {
    hasParent: false,
  }
);

const emit = defineEmits(["closeThread"]);

const commentField = ref<InstanceType<typeof CommentField>>();
const menuOpened = ref<boolean>(false);
const isThreadExpanded = ref<boolean>(true);
const isInputShown = ref<boolean>(false);
const commentLocal = ref<IComment>(props.comment);

const onThreadToggle = () => {
  isThreadExpanded.value = !isThreadExpanded.value
}

const closeThread = () => {
  emit("closeThread")
}

const onReply = () => {
  isInputShown.value = !isInputShown.value;
}

const onReplySubmit = async (text: string) => {
  const data = await useFetchAuth(`http://127.0.0.1:8000/api/episode/${route.params.episode_id}/comment`, {
    method: "POST",
    body: JSON.stringify({ body: text, parentCommentId: props.comment.id }), 
  });

  if (commentField.value) {
    commentField.value.commentText = "";
  }

  isInputShown.value = false;

  if (!commentLocal.value.subcomments?.length) {
    commentLocal.value.subcomments = [];  
  }

  commentLocal.value.subcomments.push(data as IComment);
}

</script>

<template>
  <div class="comment">
    <div class="comment__container">
      <div class="comment__header">
        <CommentUser :user="commentLocal.owner" :date="commentLocal.createdAt" :comment-id="commentLocal.id" />
      </div>
      <div class="comment__body">
        <div :id="`c${commentLocal.id}`" class="comment__anchor"></div>
        <div class="comment__text">{{ commentLocal.body.text }}</div>
        <div v-if="commentLocal.body.image" class="comment__image">
          <NuxtPicture :src="commentLocal.body.image" />
        </div>
      </div>
      <div class="comment__tools">
        <button class="comment__reply" @click.prevent="onReply">
          <svg-icon name="reply" />
          <span>Ответить</span>
        </button>
        <div class="comment__menu">
          <button class="comment__menu-btn">
            <svg-icon name="context-menu" />
          </button>
          <div class="comment__menu-dropdown">
          </div>
        </div>
      </div>
      <CommentField ref="commentField" v-if="isInputShown" @add-comment="onReplySubmit" />
    </div>
    <div v-if="commentLocal.subcomments" class="subcomment">
      <CommentItem
        v-for="subcomment in commentLocal.subcomments"
        :key="subcomment.id"
        v-show="isThreadExpanded"
        :comment="subcomment"
        :has-parent="true"
        @close-thread="onThreadToggle"
      />
      <button
        v-show="!isThreadExpanded"
        type="button"
        class="subcomment__thread"
        @click.prevent="onThreadToggle"
      >
        <svg-icon name="plus" />
        <span>Развернуть ветку</span>
      </button>
    </div>
    <button v-if="hasParent" @click.prevent="closeThread" class="comment__line">
      <span class="comment__thread"></span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  position: relative;

  .subcomment {
    margin-left: 26px;

    &__thread {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-left: -26px;
      font-size: 16px;
      color: color("accent", "3");
      
      &:hover {
        color: color("accent", "5");
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__container {
    margin-bottom: 10px;
  }

  &__header {
    margin-bottom: 10px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__anchor {
    position: absolute;
    visibility: hidden;
  }

  &__text {
    font-size: 16px;
    color: color("text", "base");
  }

  &__image {}

  &__tools {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__reply {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 300;
    color: color("text", "base");

    &:hover {
      color: color("text", "1");

      svg {
        color: color("text", "1");
      }
    }

  }

  &__menu {}

  &__menu-btn {
    display: flex;
    align-items: center;
    color: color("text", "base");
  
    &:hover {
      color: color("text", "1");
    }
  }

  &__menu-dropdown {
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transform: translateX(-100%);
    cursor: pointer;

    &:hover .comment__thread {
      background-color: color("text", "1");
    }
  }
  
  &__thread {
    width: 1px;
    height: 100%;
    background-color: color("text", "5");
  }

  :deep(.comment-field) {
    margin: 10px 0;
  }

  :deep(.comment-field__textarea) {
    min-height: 70px;
  }
}
</style>