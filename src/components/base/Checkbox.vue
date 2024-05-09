<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    value: boolean;
    label?: string;
    id: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits(['click']);

const onClick = () => {
  emit('click');
}

</script>

<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      :value="value"
      @click.prevent="onClick"
      v-bind="{
        ...(disabled === true && { disabled }),
      }"
      class="checkbox__field"
      :class="{ 'checkbox__field--active': value === true }"
    >
    <label
      v-if="label"
      :for="id"
      @click.prevent="onClick"
      class="checkbox__label"
      >
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;

  &__field {
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: 0;
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid color("border", "4");
    cursor: pointer;

    &:hover::after {
      display: block;
      background-image: url('~/assets/icons/check-hover.svg');
    }

    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url('~/assets/icons/check.svg');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      width: 20px;
      height: 20px;
    }
  }

  &__field--active {
    border-color: color("accent", "base");
    background-color: color("accent", "base");

    &:hover::after,
    &::after {
      content: "";
      display: block;
      background-image: url('~/assets/icons/check.svg');
    }
  }

  &__label {
    cursor: pointer;
    font-size: 14px;
    color: color("text", "3");
  }
}
</style>