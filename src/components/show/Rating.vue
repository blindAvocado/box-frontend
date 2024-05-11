<script setup lang="ts">
import { useUser } from '~/stores/user';
import StarRating from '~/components/base/StarRating.vue';
import type { IRating } from '~/types/base';

const user = useUser();

const props = withDefaults(
  defineProps<{
    communityRating: IRating,
    myRating?: number,
  }>(),
  {
    myRating: 4,
  }
);

console.log("🚀 ~ user.loggedIn:", user.loggedIn);

const localRating = ref<number>(user.loggedIn ? props.myRating : props.communityRating.average);

const onReset = () => {
  localRating.value = 0;
}

const onRated = (rating: number) => {
  localRating.value = rating;
}

</script>

<template>
  <div class="show-rating">
    <StarRating
      :value="localRating"
      :readonly="!user.loggedIn"
      @rate="onRated"
      @reset="onReset"
    />
    <div class="average-rating">
      <div class="value">{{ communityRating.average }}</div>
      <div class="votes">{{ normalizeBigNumbers(communityRating.votes) }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.show-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.average-rating {
  display: flex;
  align-items: flex-start;
  gap: 2px;
}
.value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: color("text", "1");
}
.votes {
  font-size: 12px;
  font-weight: 200;
  line-height: 1;
  color: color("text", "3");
}
</style>
