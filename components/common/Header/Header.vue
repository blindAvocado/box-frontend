<script setup lang="ts">
import { useElementSize } from '@vueuse/core'

import HeaderProfile from "@common/Header/HeaderProfile.vue";
import Search from "@common/Header/Search.vue";

const search = ref<InstanceType<typeof Search>>();
const center = ref<HTMLDivElement | null>(null);

const { width: centerWidth } = useElementSize(center);

const centerWidthPx = computed(() => {
  return centerWidth.value + 'px'
})

const isSearchActive = computed(() => {
  return search.value?.isFieldActive
})
</script>

<template>
  <header class="header">
    <div class="container-big">
      <div class="header__wrapper">
        <div class="logo">
          <NuxtLink to="/">BOX</NuxtLink>
        </div>
        <div ref="center" class="center">
          <Transition name="nav">
            <nav v-show="!isSearchActive" class="nav">
              <ul class="nav__list">
                <li class="nav__list-item">
                  <NuxtLink to="/shows/">Сериалы</NuxtLink>
                </li>
                <li class="nav__list-item">
                  <NuxtLink to="/news/">Новости</NuxtLink>
                </li>
                <li class="nav__list-item">
                  <NuxtLink to="/community/">Сообщество</NuxtLink>
                </li>
                <li class="nav__list-item">
                  <NuxtLink to="/lists/">СПИСКИ</NuxtLink>
                </li>
              </ul>
            </nav>
          </Transition>
          <Search ref="search" :max-width="centerWidthPx" />
        </div>
        <HeaderProfile />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
  }
}

.logo {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: color('accent', 'base');

  & a:hover {
    color: color('accent', '3');
  }
}

.center {
  position: relative;
  flex: 1 0;
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.search) {
    position: absolute;
    right: 0;
  }
}

.nav {
  // @include font('roboto');
  z-index: 2;

  &__list {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__list-item {
    position: relative;
    color: color("text", "1");
    text-transform: uppercase;
    font-weight: 700;

    &:not(:first-child)::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 0;
      bottom: 0;
      width: 1px;
      height: 100%;
      background-color: color('border', '3');
    }
  }
}

.nav-enter-active,
.nav-leave-active {
  transition: opacity 0.2s $easing;
}

.nav-enter-from,
.nav-leave-to {
  opacity: 0;
}
</style>
