<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps<{
  maxWidth: string;
}>();

const query = ref("");
const isFieldActive = ref(false);

const fieldWidth = computed(() => {
  return isFieldActive.value ? props.maxWidth : "32px";
});

const hideField = () => {
  isFieldActive.value = false;
};

const onButtonClick = () => {
  if (isFieldActive.value) {
    onSubmit();
  }

  isFieldActive.value = true;
};

const onSubmit = () => {
  if (!query.value) {
    return;
  }

  console.log(query.value);
};

watchDebounced(query, (val) => {
  console.log("🚀 ~ watchDebounced ~ val:", val)
}, { debounce: 500 })

defineExpose({ isFieldActive });
</script>

<template>
  <div class="search" v-on-click-outside="hideField">
    <form class="search__form" @submit.prevent="onSubmit">
      <Transition name="field">
        <input v-show="isFieldActive" v-model="query" type="text" class="search__field" />
      </Transition>
      <button type="button" class="search__btn" @click.prevent="onButtonClick">
        <svg-icon name="search" />
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  height: 100%;
  width: 100%;
  max-width: v-bind("props.maxWidth");

  &__form {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }

  &__field {
    height: 100%;
    width: 100%;
    border: none;
    padding: 0;
  }

  .field-enter-active {
    animation: field 0.5s $easing;
  }

  .field-leave-active {
    animation: field 0.5s $easing reverse;
  }

  &__btn {
    color: color("text", "1");

    :deep(svg) {
      width: 32px;
      height: 32px;
    }
  }
}

@keyframes field {
  from {
    opacity: 0;
    max-width: 0px;
  }

  to {
    opacity: 1;
    max-width: v-bind("props.maxWidth");
  }
}
</style>
