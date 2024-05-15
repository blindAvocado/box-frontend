<script setup lang="ts">

const emit = defineEmits(['addComment']);

const commentText = ref("");

const onSubmit = () => {
  emit('addComment', commentText.value)
}

defineExpose({ commentText });
</script>

<template>
  <div class="comment-field">
    <textarea v-model="commentText" class="comment-field__textarea" placeholder="Оставить комментарий"></textarea>
    <div class="comment-field__btns">
      <BaseButton type="button" @on-click="onSubmit" class="comment-field__submit">Написать</BaseButton>
      <button type="button" class="comment-field__picture">
        <svg-icon name="image" />
        <span>Добавить</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-field {
  display: flex;
  flex-direction: column;

  &__textarea {
    width: 100%;
    background-color: color("border", "1");
    border: 1px solid color("border", "base");
    border-radius: 5px;
    max-width: 100%;
    min-height: 120px;
    color: color("text", "1");
    font-size: 16px;
    @include font("base");
    outline: none;
    padding: 9px 11px;
    resize: vertical;
  }

  &__btns {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
  }

  &__submit {
    width: fit-content;
    font-size: 16px;
  }

  &__picture {
    display: flex;
    align-items: center;
    gap: 5px;
    color: color("text");
    font-size: 16px;

    &:hover {
      color: color("text", "1");
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>