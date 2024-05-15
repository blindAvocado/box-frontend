<script setup lang="ts">

withDefaults(
  defineProps<{
    kind?: "highlighted" | "dark",
    disabled?: boolean,
    type?: "button" | "submit" | "reset",
  }>(),
  {
    kind: "highlighted",
    disabled: false,
    type: "button",
  }
)

const emit = defineEmits(["onClick"]);

const onClick = () => {
  emit("onClick");
}

</script>

<template>
  <button 
    :type="type" 
    @click.prevent="onClick" 
    class="button"
    :disabled="disabled"
  >
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