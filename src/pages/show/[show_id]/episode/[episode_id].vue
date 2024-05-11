<script setup lang="ts">
import type { IUserRating } from '~/types/base';
import type { IEpisodePage, IOtherEpisode } from '~/types/episode';
import { NuxtLink } from '#components';
import SidebarBlock from '~/components/base/SidebarBlock.vue';
import UserRating from '~/components/cards/UserRating.vue';
import Breadcrumbs from '~/components/base/Breadcrumbs.vue';
import EpisodeMainInfo from '~/components/episode/EpisodeMainInfo.vue';

const user = useUser();
const route = useRoute();

const { data: episodePage } = await useFetch<IEpisodePage>(`/api/show/${route.params.show_id}/episode/${route.params.episode_id}`);
if (!episodePage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const otherEpisodes = computed((): IOtherEpisode[] | null => {
  return episodePage.value?.otherEpisodes ?? null
})

const friendsRatings = computed((): IUserRating[] | null => {
  return episodePage.value?.personal.friends ?? null
})

const breadcrumbs = computed(() => {
  return [
    { label: 'Сериалы', link: '/shows' },
    { label: episodePage.value?.showName ?? 'Сериал', link: `/show/${route.params.show_id}` },
    { label: `Сезон ${episodePage.value?.seasonNumber}`, link: `/show/${route.params.show_id}/season/${episodePage.value?.seasonNumber}` },
  ]
})
</script>

<template>
  <div v-if="episodePage" class="episode">
    <div class="container">
      <div class="episode__wrapper">
        <div class="episode__content">
          <Breadcrumbs :items="breadcrumbs" />
          <EpisodeMainInfo :episode="episodePage" :other-episodes="otherEpisodes" />
        </div>
        <div class="sidebar">
          <SidebarBlock
            v-if="friendsRatings"
            title="Оценки друзей"
            :items="friendsRatings"
          >
            <template v-slot:default="{ item }">
              <UserRating :user="item" />
            </template>
          </SidebarBlock>
          <SidebarBlock
            v-if="otherEpisodes"
            title="Другие серии"
            :items="otherEpisodes"
          >
            <template v-slot:default="{ item }">
              <div class="sidebar__link">
                <component
                  :is="item.id == route.params.episode_id ? 'span' : NuxtLink"
                  :to="`/show/${route.params.show_id}/episode/${item.id}`"
                  class="sidebar__episode"
                  :class="{ 'sidebar__episode--highlighted': item.id == route.params.episode_id }"
                >
                  {{ `${normalizeEpisodeMarking(item.seasonNumber, item.episodeNumber)} - ${item.name}` }}
                </component>
              </div>
            </template>
          </SidebarBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.episode {
  position: relative;
  padding-bottom: 50px;
  
  &__wrapper {
    display: flex;
    gap: 20px;
    padding: 50px 0;
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
  width: 280px;

  &__link {
    display: flex;
    align-items: center;
  }

  &__episode {
    font-size: 14px;
    font-weight: 300;
    color: color("text", "3");

    &:hover {
      color: color("accent", "6");
    }
  }

  &__episode--highlighted {
    color: color("accent", "4");
  }
}
</style>