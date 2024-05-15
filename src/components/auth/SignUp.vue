<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';

const emit = defineEmits(["formSwitch"])

const form = ref<{
  username: string,
  password: string,
}>({
  username: "",
  password: "",
});

const isFormValid = computed(() => {
  if (!form.value?.username || !form.value?.password) return false;
  if (form.value?.username.length < 3 || form.value?.password.length < 8) return false;

  return true;
})

const onSubmit = () => {
  if (isFormValid.value) {
    console.log(""); 
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__header">Добро пожаловать</div>
    <form class="auth__form">
      <BaseInput 
        v-model="form.username" 
        id="username"
        label="Логин" 
        :required="true"
      />
      <BaseInput 
        v-model="form.password" 
        id="password" 
        type="password" 
        label="Пароль"
        :required="true"
      />
      <div class="auth__footer">
        <BaseButton :disabled="!isFormValid" @click.prevent="onSubmit" class="auth__submit">Создать</BaseButton>
        <div class="auth__tip">
          <span>Уже есть аккаунт?</span>
          <NuxtLink to="/sign_in" class="auth__tip-btn">Войти</NuxtLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
</style>