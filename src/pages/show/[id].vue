<script setup lang="ts">
import type { IShow, IShowCard, IShowPage, IUserRating } from "~/types/show";
import { normalizeEpisodeMarking } from "~/utils/normalizeEpisode";

import SidebarBlock from "~/components/base/SidebarBlock.vue";
import MainInfo from "~/components/show/MainInfo.vue";
import Poster from "~/components/show/Poster.vue";
import Community from "~/components/show/Community.vue";
import Rating from "~/components/show/Rating.vue";
import WatchButton from "~/components/show/WatchButton.vue";
import UserRating from "~/components/cards/UserRating.vue";
import ShowBanner from "~/components/cards/ShowBanner.vue";
import ListBlock from "~/components/base/ListBlock.vue";

interface SidebarItem {
  name: string;
  link: string;
}

const user = useUser();
const route = useRoute();

const { data: showPage } = await useFetch<IShowPage>(`/api/show/${route.params.id}`);
if (!showPage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const show = computed((): IShow | null => {
  return showPage.value?.show ?? null
})

const alsoWatched = computed((): IShowCard[] | null => {
  return showPage.value?.alsoWatched ?? null
})

const hasBackdrop = computed((): boolean => {
  return !!show.value?.backdropPath;
});

const bestEpisodes = computed((): SidebarItem[] => {
  if (!show.value?.bestEpisodes?.length) {
    return [];
  }

  const result: SidebarItem[] = [];

  for (const episode of show.value?.bestEpisodes) {
    const episodeName: string = normalizeEpisodeMarking(episode.seasonNumber, episode.episodeNumber);
    const name = `${episodeName}` + (episode.rating ? ` — ${episode.rating}` : "");
    const link = `/show/${route.params.id}/episode/${episode.id}`;

    result.push({
      name,
      link,
    });
  }

  result.push({
    name: "Все серии",
    link: `/show/${route.params.id}/rating`,
  });

  return result;
});

const friendsRatings = computed((): IUserRating[] | null => {
  console.log("🚀 ~ friendsRatings ~ show.value?.friends:", show.value?.friends)
  return show.value?.friends ?? null
})

// console.log("🚀 ~ onBeforeMount ~ show:", show);
</script>

<template>
  <div v-if="show" class="backdrop-container">
    <div class="backdrop">
      <NuxtPicture
        v-if="show.backdropPath"
        format="avif,webp,jpg"
        :src="show.backdropPath"
        :width="1200"
        :height="675"
        :placeholder="[1200, 675, 75, 3]" 
      />
    </div>
  </div>
  <div v-if="show" class="show">
    <div class="container">
      <div class="show__wrapper" :class="{ 'show__wrapper--hasBackdrop': hasBackdrop }">
        <div class="show__content">
          <div class="left-wrapper">
            <div class="left">
              <Poster :poster="show.posterPath" />
              <Community :community="show.community" class="show__community" />
              <Rating :community-rating="show.community.rating" class="show__rating" />
              <WatchButton class="show__watch-btn" />
            </div>
          </div>
          <MainInfo :show/>
        </div>
        <div class="sidebar">
          <SidebarBlock
            v-if="bestEpisodes"
            title="Лучшие серии"
            :items="bestEpisodes"
            :link="`/show/${route.params.id}/rating`"
          >
            <template v-slot:default="{ item }">
              <div class="sidebar-link">
                <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
              </div>
            </template>
          </SidebarBlock>
          <SidebarBlock
            v-if="friendsRatings"
            title="Оценки друзей"
            :items="friendsRatings"
            :link="`/${user.username}/friends/show/${route.params.id}`"
          >
            <template v-slot:default="{ item }">
              <UserRating :user="item" />
            </template>
          </SidebarBlock>
        </div>
      </div>
      <div v-if="alsoWatched" class="show__recommended">
        <ListBlock title="С этим сериалом смотрят" :items="alsoWatched">
          <template v-slot:default="{ item }">
            <ShowBanner :show="item" />
          </template>
        </ListBlock>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show {
  position: relative;
  padding-bottom: 100px;
  
  &__wrapper {
    display: flex;
    gap: 20px;
    padding: 100px 0 50px;

    &--hasBackdrop {
      padding-top: 400px;
    }
  }

  &__content {
    display: flex;
    flex: 1 1 auto;
    gap: 20px;
  }

  &__community {
    margin-top: 10px;
  }

  &__rating {
    margin-top: 15px;
  }

  &__watch-btn {
    margin-top: 15px;
  }

  &__recommended {
    margin-left: 250px;
    overflow: hidden;
    max-width: 100%;
    overflow-x: scroll;
  }
}

.backdrop-container {
  height: 675px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: -$header-height;
  width: 100%;
  z-index: 0;
}

.backdrop {
  display: flex;
  position: absolute;
  left: 50%;
  top: -$header-height;
  max-width: 1200px;
  width: 100%;
  height: 675px;
  transform: translateX(-50%);
  z-index: 0;

  &::before {
    background-image: linear-gradient(90deg, #0f0f0f 0, rgba(15, 15, 15, .986) .97%, rgba(15, 15, 15, .945) 2.07833333%, rgba(15, 15, 15, .883) 3.29666667%, rgba(15, 15, 15, .803) 4.60166667%, rgba(15, 15, 15, .711) 5.96666667%, rgba(15, 15, 15, .61) 7.365%, rgba(15, 15, 15, .504) 8.77166667%, rgba(15, 15, 15, .398) 10.16%, rgba(15, 15, 15, .296) 11.505%, rgba(15, 15, 15, .203) 12.78%, rgba(15, 15, 15, .122) 13.95833333%, rgba(15, 15, 15, .059) 15.01666667%, rgba(15, 15, 15, .016) 15.92833333%, rgba(15, 15, 15, 0) 16.66666667%, rgba(15, 15, 15, 0) 83.33333333%, rgba(15, 15, 15, .016) 84.07166667%, rgba(15, 15, 15, .059) 84.98333333%, rgba(15, 15, 15, .122) 86.04166667%, rgba(15, 15, 15, .203) 87.22%, rgba(15, 15, 15, .296) 88.495%, rgba(15, 15, 15, .398) 89.84%, rgba(15, 15, 15, .504) 91.22833333%, rgba(15, 15, 15, .61) 92.635%, rgba(15, 15, 15, .711) 94.03333333%, rgba(15, 15, 15, .803) 95.39833333%, rgba(15, 15, 15, .883) 96.70333333%, rgba(15, 15, 15, .945) 97.92166667%, rgba(15, 15, 15, .986) 99.03%, #0f0f0f), linear-gradient(0deg, #0f0f0f 0, #0f0f0f 21.48148148%, rgba(15, 15, 15, .986) 23.63703704%, rgba(15, 15, 15, .945) 26.1%, rgba(15, 15, 15, .883) 28.80740741%, rgba(15, 15, 15, .803) 31.70740741%, rgba(15, 15, 15, .711) 34.74074074%, rgba(15, 15, 15, .61) 37.84814815%, rgba(15, 15, 15, .504) 40.97407407%, rgba(15, 15, 15, .398) 44.05925926%, rgba(15, 15, 15, .296) 47.04814815%, rgba(15, 15, 15, .203) 49.88148148%, rgba(15, 15, 15, .122) 52.5%, rgba(15, 15, 15, .059) 54.85185185%, rgba(15, 15, 15, .016) 56.87777778%, rgba(15, 15, 15, 0) 58.51851852%);
    background-repeat: no-repeat;
    content: "";
    display: block;
    height: 675px;
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 1200px;
    z-index: 0;
  }

  img,
  picture {
    object-fit: cover;
    width: 100%;
  }
}

.left-wrapper {
  width: 230px;
}

.left {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  flex: 1 0;
  max-width: 230px;
}

.main {
  flex: 1 1 auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1 0 auto;
  width: 180px;

  :deep(.sidebar-link) {
    font-weight: 300;
    font-size: 14px;
    color: color("text", "3");
  }
}
</style>
