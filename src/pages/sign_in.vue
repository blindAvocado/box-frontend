<script setup lang="ts">
import SignIn from '~/components/auth/SignIn.vue';

definePageMeta({
  pageTransition: {
    name: 'out-in'
  }
})

const toggleForm = async () => {
  await navigateTo('/sign_up');
}

</script>

<template>
  <main class="main">
    <div class="container">
      <SignIn @form-switch="toggleForm" />
    </div>
  </main>
</template>

<style lang="scss"></style>