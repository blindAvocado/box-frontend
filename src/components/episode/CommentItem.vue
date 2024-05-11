<script setup lang="ts">
import type { IComment } from '~/types/episode';
import CommentUser from './CommentUser.vue';


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

const menuOpened = ref<boolean>(false);
const isThreadExpanded = ref<boolean>(true);

const onThreadToggle = () => {
  isThreadExpanded.value = !isThreadExpanded.value
}

const closeThread = () => {
  emit("closeThread")
}

</script>

<template>
  <div class="comment">
    <div class="comment__container">
      <div class="comment__header">
        <CommentUser :user="comment.owner" :date="comment.createdAt" :comment-id="comment.id" />
      </div>
      <div class="comment__body">
        <div :id="`c${comment.id}`" class="comment__anchor"></div>
        <div class="comment__text">{{ comment.body.text }}</div>
        <div v-if="comment.body.image" class="comment__image">
          <NuxtPicture :src="comment.body.image" />
        </div>
      </div>
      <div class="comment__tools">
        <button class="comment__reply">
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
    </div>
    <div class="subcomment">
      <CommentItem
        v-show="isThreadExpanded"
        v-if="comment.subcomment"
        :comment="comment.subcomment"
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
}
</style>