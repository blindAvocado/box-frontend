<script setup lang="ts">
import { computed } from 'vue'

interface ISvgIcon {
  prefix?: string
  name: string
  color?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<ISvgIcon>(), {
  prefix: 'icon',
  color: '#333',
  width: '100%',
  height: '100%',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const styleObj = computed(() => {
  return {
    width:
      props.width.includes('%') || props.width.includes('auto')
        ? props.width
        : props.width + 'px',
    height:
      props.height.includes('%') || props.height.includes('auto')
        ? props.height
        : props.height + 'px',
  }
})
</script>

<template>
  <svg :style="styleObj">
    <use :xlink:href="symbolId" :fill="color" :width="width" :height="height" :color="color" />
  </svg>
</template>