<script setup lang="ts">

const route = useRoute();

const settings = [
  { label: "Полная статистика", link: "/me/stats" },
  { label: "Избранное", link: `/user/${route.params.user_id}/likes` },
  { label: "Комментарии", link: `/user/${route.params.user_id}/comments` },
  { label: "Настройки", link: "/me/settings" },
  { label: "Поддержка", link: "/support" },
  { label: "Выйти", link: "/me/logout" },
]

</script>

<template>
  <ul class="profile-settings">
    <li v-for="(setting, index) in settings" :key="index" class="profile-settings__link">
      <NuxtLink :to="setting.link">
        {{ setting.label }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.profile-settings {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;

  &__link {
    font-size: 14px;
    font-weight: 300;
    color: color("text", "3");
  }
}
</style>