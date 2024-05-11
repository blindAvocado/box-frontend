<script setup lang="ts">
import type { IProfile } from '~/types/profile';
import SidebarBlock from '~/components/base/SidebarBlock.vue';
import HeaderBlock from '~/components/base/HeaderBlock.vue';
import ShowTabs from '~/components/profile/ShowTabs.vue';
import ProfileHeader from '~/components/profile/ProfileHeader.vue';
import Heatmap from '~/components/profile/Heatmap.vue';
import ProfileSettings from '~/components/profile/ProfileSettings.vue';

const user = useUser();
const route = useRoute();

const { data: profile } = await useFetch<IProfile>(`/api/user/${route.params.user_id}`);
if (!profile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const totalRatings = computed(() => {
  if (!profile.value) {
    return;
  }

  return Object.values(profile.value?.ratings).reduce((prev, cur) => prev + cur)
})
</script>

<template>
  <div v-if="profile" class="profile">
    <div class="container">
      <div class="profile__wrapper">
        <ProfileHeader
          :wasted="profile.wasted"
          :stats="profile.stats"
          :socials="profile.socials"
          :user="profile.user"
        />
        <div class="profile__body">
          <div class="profile__content">
            <HeaderBlock title="Сериалы">
              <ShowTabs/>
            </HeaderBlock>
  
            <HeaderBlock title="Статистика по дням" :link="`${route.params.user_id}/wasted`">
              <template v-slot:default>
                <Heatmap :data="profile.heatmap" />
              </template>
              <template v-slot:link>
                Полная статистика
              </template>
            </HeaderBlock>
  
            <HeaderBlock title="Отслеживаемые" :link="`${route.params.user_id}/following`">
              <template v-slot:default>
                <span>пук</span>
              </template>
              <template v-slot:link>
                Все
              </template>
            </HeaderBlock>
  
            <HeaderBlock title="Последние события" :link="`${route.params.user_id}/activity`">
              <template v-slot:default>
                <span>пук</span>
              </template>
              <template v-slot:link>
                Все события
              </template>
            </HeaderBlock>
  
          </div>
          <div class="sidebar">
            <SidebarBlock title="Профиль">
              <template v-slot:single>
                <ProfileSettings />
              </template>
            </SidebarBlock>

            <SidebarBlock
              title="Оценки"
              :count="totalRatings"
              :show-count="true"
            >
  
            </SidebarBlock>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  position: relative;
  padding: 50px 0;
  
  &__body {
    display: flex;
    gap: 20px;
    padding: 30px 0 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    gap: 20px;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 0 0 auto;
  width: 250px;
}
</style>