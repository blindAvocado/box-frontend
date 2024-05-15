<script setup lang="ts">
import SignUp from '~/components/auth/SignUp.vue';

definePageMeta({
  pageTransition: {
    name: 'out-in'
  }
})

const toggleForm = async () => {
  await navigateTo('/sign_in');
}

</script>

<template>
  <main class="main">
    <div class="container">
      <SignUp @form-switch="toggleForm" />
    </div>
  </main>
</template>

<style lang="scss"></style>