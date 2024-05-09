<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number,
    readonly?: boolean,
    roundInitalRating?: boolean,
    height?: number
  }>(),
  {
    readonly: false,
    roundInitalRating: true,
    height: 26,
  }
);

const emit = defineEmits(['reset', 'rate']);

const cursorPosX = ref<number>(0);
const isHovered = ref<boolean>(false);
const wrapperRef = ref<Element | null>(null);
const outlinedRef = ref<Element | null>(null);
const selectedRef = ref<Element | null>(null);
const hoveredRef = ref<Element | null>(null);

const wrapperWidth = computed(() => {
  return props.height * 5.3125
})

const starsHeight = computed(() => {
  return `${props.height}px`
})

const selectedWidth = computed(() => {
  if (!props.value || !wrapperWidth.value) {
    return '0px';
  }
  
  return ratingToWidth(props.value, wrapperWidth.value)
})

const hoveredWidth = computed(() => {
  if (!hoveredRating.value || !wrapperWidth.value) {
    return '0px';
  }

  return ratingToWidth(hoveredRating.value, wrapperWidth.value)
})

const hoveredRating = computed(() => {
  if (!isHovered.value || !wrapperWidth.value || cursorPosX.value <= 0) {
    return 0;
  }

  const pointWidth = wrapperWidth.value ? wrapperWidth.value / 10 : 0;

  return (Math.ceil(cursorPosX.value / pointWidth) / 2)
})

const starsVisiblity = computed(() => {
  const res = {
    selected: 'none',
    hovered: 'none',
  }

  if (!props.readonly && isHovered.value) {
    res.hovered = 'block';
    return res;
  }

  if (props.readonly || props.value) {
    res.selected = 'block';
    return res;
  }

  return res;
})

const onMouseMove = (e: MouseEvent) => {
  cursorPosX.value = e.offsetX;
}

const onReset = () => {
  emit('reset');
}

const onChange = (hoveredRating: number) => {
  emit('rate', hoveredRating);
}

const ratingToWidth = (rating: number, wrapperWidth: number): string => {
  const pointWidth = wrapperWidth ? wrapperWidth / 10 : 0;
  const result = pointWidth * (rating * 2);

  return result > wrapperWidth ? '0px' : `${result}px`;
}

</script>

<template>
  <div class="rating">
    <button v-if="!readonly" @click.prevent="onReset" class="reset">
      <nuxt-icon name="close" />
    </button>
    <button
      ref="wrapperRef"
      @mousemove="!readonly && onMouseMove($event)"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="onChange(hoveredRating)"
      class="stars-wrapper"
    >
      <nuxt-icon
        ref="outlinedRef"
        name="rating-outlined"
        class="stars stars--outlined"
      />
      <nuxt-icon 
        ref="selectedRef" 
        name="rating-selected"
        class="stars stars--selected"
        :style="{ display: starsVisiblity.selected, width: selectedWidth }"

      />
      <nuxt-icon 
        ref="hoveredRef" 
        name="rating-hover"
        class="stars stars--hovered"
        :style="{ display: starsVisiblity.hovered, width: hoveredWidth }"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.rating {
  position: relative;
  display: flex;
  align-items: center;

  &:hover .reset {
    left: -15%;
    margin-right: 5px;
    opacity: 1;
  }
}

.reset {
  // position: absolute;
  left: 0;
  color: color("text");
  opacity: 0;
  margin-right: -15px;
  transition: all 0.2s $easing;
}

.stars-wrapper {
  position: relative;
  cursor: pointer;
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: #554300;
  overflow: hidden;
  pointer-events: none;
  
  :deep(svg) {
    height: v-bind("starsHeight");
    width: fit-content;
  }

  &--outlined {
    position: static;
    display: flex;
    width: 100%;
  }

  &--selected {
    color: color("accent", "base");
    // background-image: url('/img/icons/rating-selected.svg');
  }

  &--hovered {
    color: color("elements", "mint");
    // background-image: url('/img/icons/rating-hover.svg');
  }
}
</style>