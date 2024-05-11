<script setup lang="ts">

withDefaults(
  defineProps<{
    kind?: "highlighted" | "dark"
  }>(),
  {
    kind: "highlighted"
  }
)

const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
}

</script>

<template>
  <button type="button" @click.prevent="onClick" class="button">
    <slot>
      Text
    </slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding: 10px 30px;
  width: 100%;
  border-radius: 10px;
  background-color: color("accent", "base");
  font-size: 20px;
  font-weight: 700;
  color: #554300;
}
</style>