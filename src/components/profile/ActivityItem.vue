<script setup lang="ts">
import type { IActivityItem } from '~/types/profile';
import StarRating from '../base/StarRating.vue';

type IWatchStatus = "WATCHING" | "STOPPED" | "GOING_TO" | "NOT_WATCHING"

const props = defineProps<{
  event: IActivityItem
}>();

const type = props.event.event;

const getStatusString = (status: IWatchStatus) => {
  switch (status) {
    case 'GOING_TO':
      return 'будет смотреть'
    case 'STOPPED':
      return 'перестал смотреть'
    case 'WATCHING':
      return 'начал смотреть'
    case 'NOT_WATCHING':
      return 'больше не смотрит'
  }
}

</script>

<template>
  <div class="activity">
    <span class="activity__time">{{ convertISOTimeToString(event.date, ['h', 'm']) }} — </span>
    <div class="activity__body">
      <template v-if="type === 'rated'">
        <span>оценил</span>
        <StarRating :value="(event.value as number)" :readonly="true" :height="20" />
        <NuxtLink :to="`/show/${event.target.show?.id}/episode/${event.target.id}`">
          [{{ normalizeEpisodeMarking(event.target.season!, event.target.episode!) }}]
        </NuxtLink>
        <span>серию сериала</span>
        <NuxtLink :to="`/show/${event.target.show?.id}`">
          {{ event.target.show?.name }}
        </NuxtLink>
      </template>

      <template v-if="type === 'watched'">
        <span>посмотрел</span>
        <NuxtLink :to="`/show/${event.target.show?.id}/episode/${event.target.id}`">
          [{{ normalizeEpisodeMarking(event.target.season!, event.target.episode!) }}]
        </NuxtLink>
        <span>серию сериала</span>
        <NuxtLink :to="`/show/${event.target.show?.id}`">
          {{ event.target.show?.name }}
        </NuxtLink>
      </template>

      <template v-if="type === 'comment'">
        <svg-icon name="comment" class="activity__comment" />
        <NuxtLink :to="`/show/${event.target.show?.id}/episode/${event.target.id}/#c${event.value}`">
          [{{ normalizeEpisodeMarking(event.target.season!, event.target.episode!) }}]
        </NuxtLink>
        <span>серию сериала</span>
        <NuxtLink :to="`/show/${event.target.show?.id}`">
          {{ event.target.show?.name }}
        </NuxtLink>
      </template>

      <template v-if="type === 'status'">
        <span>{{ getStatusString((event.value as IWatchStatus)) }} сериал</span>
        <NuxtLink :to="`/show/${event.target.id}`">
          {{ event.target.name }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activity {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 0;
  border-bottom: 1px solid color("border");

  .activity__time {
    color: color("text", "3");
  }

  .activity__body {
    display: flex;
    align-items: center;
    gap: 5px;  
  }

  &__comment {
    width: 16px;
    height: 16px;
  }
}
</style>