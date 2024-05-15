<script setup lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseInput from '../base/BaseInput.vue';

const emit = defineEmits(["formSwitch"])

const user = useUser()

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
    user.login(form.value);
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__header">С возвращением</div>
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
        <BaseButton 
          type="submit" 
          :disabled="!isFormValid" 
          @click.prevent="onSubmit"
          class="auth__submit"
        >
          Войти
        </BaseButton>
        <div class="auth__tip">
          <span>Нет аккаунта?</span>
          <NuxtLink to="/sign_up" class="auth__tip-btn">Создайте</NuxtLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>