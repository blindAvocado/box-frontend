<script setup lang="ts">
import Footer from "@common/Footer/Footer.vue";
import Header from "@common/Header/Header.vue";
</script>

<template>
  <div class="page">
    <Header />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>


<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;

  :deep(.footer) {
    margin-top: auto;
  }
}
</style>