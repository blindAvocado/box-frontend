<script setup lang="ts">
import Footer from '@common/Footer/Footer.vue';
import Header from '@common/Header/Header.vue';

</script>

<template>
  <Header />
  <div class="content">
    <slot/>
  </div>
  <Footer />
</template>