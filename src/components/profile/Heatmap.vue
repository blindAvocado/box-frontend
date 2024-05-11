<script setup lang="ts">
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import type { Locale } from 'vue3-calendar-heatmap';
import type { IHeatmap } from '~/types/profile';

const props = defineProps<{
  data: IHeatmap[]
}>();

const rangeColor = ['#555555', '#6f9', '#0c3', '#093', '#063', '#004120'];

const locale: Locale = {
  months: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  days: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
  on: "",
  less: "Меньше",
  more: "Больше",
}

</script>

<template>
  <div class="heatmap">
    <CalendarHeatmap
      :values="data"
      :end-date="'2023-9-22'"
      :locale="locale"
      :range-color="rangeColor"
      :no-data-text="false"
    />
  </div>
</template>

<style lang="scss">
.vch__legend {
  font-size: 12px;
}

svg.vch__wrapper .vch__months__labels__wrapper text.vch__month__label,
svg.vch__wrapper .vch__days__labels__wrapper text.vch__day__label,
svg.vch__wrapper .vch__legend__wrapper text {
  line-height: 1;
  font-size: 10px;
  @include font("base");
  fill: color("text", "base");
}
</style>