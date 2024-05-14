<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps<{
  tabs: { label: string, name: string }[];
  selectedTab: string;
}>();

const emit = defineEmits(['changeTab'])

const onTabClick = (tabName: string) => {
  emit('changeTab', tabName);
}

</script>

<template>
  <div class="tabs-container">
    <ul class="tabs">
      <li
        v-for="(tab, index) in tabs"
        :key="`${tab.name + index}`"
        class="tab"
        :class="{ 'tab--selected': tab.name === selectedTab }"
      >
        <button class="tab-btn" @click.prevent="onTabClick(tab.name)">{{ tab.label }}</button>
      </li>
    </ul>
    <div class="tab-content" v-auto-animate>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  max-width: 650px;
}

.tabs {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid color("border", "base");
  margin-bottom: 10px;
}

.tab {
  position: relative;
  padding-bottom: 5px;

  &:hover .tab-btn {
    color: color("text", "1");
  }

  &--selected {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 1px;
      background-color: color("accent");
    }

    .tab-btn {
      color: color("text", "1");
    }
  }
}

.tab-content {
  flex: 1 0 auto;
  display: flex;

  :deep(> div) {
    width: 100%;
    max-width: 600px;
  }
}

.tab-btn {
  font-size: 16px;
  text-transform: uppercase;
  color: color("text", "3");
  transition: all 0.3s $easing;
}
</style>
