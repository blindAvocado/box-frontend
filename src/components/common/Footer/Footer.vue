<script setup lang="ts">
import LocaleDropdown from "@/components/common/Footer/LocaleDropdown.vue";
</script>

<template>
  <footer class="footer">
    <div class="container-big">
      <div class="footer__wrapper">
        <div class="top">
          <ul class="links">
            <li class="links__item">
              <NuxtLink to="/about/">О проекте</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/news/">Новости</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/help/">Помощь</NuxtLink>
            </li>
            <li class="links__item">
              <NuxtLink to="/contacts/">Контакты</NuxtLink>
            </li>
          </ul>
          <LocaleDropdown />
        </div>
        <div class="copy">
          Box © 2024. Powered by <NuxtLink href="https://www.themoviedb.org/" target="_blank">TMDb</NuxtLink>.
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: color("bg", "dark");
  padding: 10px 0 15px;
}

.footer__wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
}

.links__item {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: color("text", "4");
}

.copy {
  font-size: 12px;
  font-weight: 400;
  color: color("text", "5");
}
</style>
