<script setup lang="ts">
import HeaderProfile from "@common/Header/HeaderProfile.vue";
</script>

<template>
  <header class="header">
    <div class="logo">
      <NuxtLink to="/">BOX</NuxtLink>
    </div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__list-item">
          <NuxtLink to="/shows/">Сериалы</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink to="/news/">Новости</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink to="/community/">Сообщество</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink to="/lists/">СПИСКИ</NuxtLink>
        </li>
      </ul>
    </nav>
    <HeaderProfile />
  </header>
</template>

<style lang="scss">
.header {
  // height: $header-height;
}
</style>
