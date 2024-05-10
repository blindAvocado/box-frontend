<script setup lang="ts">
import type { IActor } from '~/types/show';
import ActorItem from '~/components/show/tabs/ActorItem.vue';

const props = defineProps<{
  actors: IActor[]
}>()

const orderedActors = computed((): IActor[] => {
  const filteredList = props.actors.filter(item => !!item).sort((a, b) => {
    if (a.order && b.order) {
      return a.order > b.order ? 1 : -1
    }

    return a.name > b.name ? 1 : -1;
  })

  return filteredList
})
</script>

<template>
  <ul class="actors">
    <li v-for="actor in orderedActors" :key="actor.id" class="actors__item">
      <ActorItem :actor />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.actors {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 60px;
  column-gap: 10px;
  row-gap: 15px;

  &__item {

  }
}
</style>
