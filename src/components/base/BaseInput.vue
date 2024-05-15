<script setup lang="ts">

interface InputProps {
  modelValue: string;
  placeholder?: string;
  type?: string;
  id?: string;
  required?: boolean;
  label?: string;
  autocomplete?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
  required: false,
  autocomplete: 'off',
});

const emit = defineEmits(['update:modelValue', 'validate']);

const localError = ref('');

const validate = (event: Event | undefined) => {
  const value = (event?.target as HTMLInputElement)?.value || props.modelValue;

  const isRequiredValid = props.required ? !!value.length : true;
    
    if (!isRequiredValid) {
      localError.value = "Заполните поле";
    } else {
      localError.value = '';
    }
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value)
}

const onBlur = async (e: FocusEvent) => {
  validate(e);
}

</script>

<template>
  <div
    class="input"
    :class="{
      'input--required': required,
      'input--active': modelValue
    }"
  >
    <label v-if="label" :for="id" class="input__label">{{ label }}</label>
    <input
      :id
      :type="type || 'text'"
      :value="modelValue"
      :data-id="id"
      @input="updateValue"
      @blur="onBlur"
      v-bind="{
        ...(placeholder && { placeholder }),
        ...(readonly && { readonly }),
        ...(disabled != null && { disabled }),
      }"
      class="input__field"
      :class="{
        'input__field--label': label,
        'input__field--error':  localError,
      }"
    />
    <div v-if="localError" class="input__error">{{ localError }}</div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;

  &--required::after {
    content: "*";
    position: absolute;
    right: 17px;
    top: 17px;
    color: #C9C9C9;
    font-size: 14px;
  }

  &__label {
    position: absolute;
    top: 12px;
    left: 10px;
    transform: translateY(0);
    @include font('base');
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: color("text", "3");
    pointer-events: none;
    transition: all 0.3s $easing;

    &:has(+ .input__field:focus),
    .input--active & {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: color("text", "4");
      top: 4px;
    }
  }

  &__field {
    width: 100%;
    height: 50px;
    @include font("base");
    font-weight: 400;
    font-size: 16px;
    background-color: color("border", "1");
    border: 1px solid color("border", "base");
    border-radius: 5px;
    color: color("text", "1");
    outline: none;
    padding: 9px 10px;
    margin-bottom: 2px;
    transition: all 0.3s $easing;
  }

  &__field[type='number'] {
    -moz-appearance: textfield;
  }

  &__field[type='number']::-webkit-inner-spin-button, 
  &__field[type='number']::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  &__field--label {
    padding-top: 10px;
  }

  &__field--pointer {
    cursor: pointer;
  }

  // &__field--disabled {
  //   border-color: #ededed;
  //   color: #999;
  //   background-color: #e7e7e7;
  // }

  &__field--error {
    border: 1px solid rgb(255, 0, 0);
    box-shadow: 0 0 0 0px red;
  }

  &__error {
    font-size: 14px;
    color: red;
  }
}
</style>