<script setup lang="ts">
import HeaderProfile from "@common/Header/HeaderProfile.vue";
</script>

<template>
  <header class="header">
    <div class="logo">BOX</div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__list-item">
          <NuxtLink>Сериалы</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink>Новости</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink>Сообщество</NuxtLink>
        </li>
        <li class="nav__list-item">
          <NuxtLink>СПИСКИ</NuxtLink>
        </li>
      </ul>
    </nav>
    <HeaderProfile />
  </header>
</template>

<style lang="scss"></style>
