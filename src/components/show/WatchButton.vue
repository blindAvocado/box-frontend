<script setup lang="ts">
type Status = "WATCHING" | "GOING_TO" | "STOPPED" | "NOT_WATCHING"

interface StatusOption {
  label: "Смотрю" | "Буду смотреть" | "Перестал" | "Не смотрю",
  value: Status,
  icon: string, 
}

const statuses: StatusOption[] = [
  { label: "Смотрю", value: "WATCHING", icon: "play" },
  { label: "Буду смотреть", value: "GOING_TO", icon: "forward" },
  { label: "Перестал", value: "STOPPED", icon: "stop" },
  { label: "Не смотрю", value: "NOT_WATCHING", icon: "close" },
];

const selectedStatus = ref<Status>("NOT_WATCHING");
const dropdownOpen = ref<boolean>(false);

const filteredOptions = computed(() => {
  return statuses.filter(status => status.value !== selectedStatus.value);
})

const currentStatus = computed(() => {
  return statuses.find(status => status.value === selectedStatus.value)!;
})

const onDropdownToggle = () => {
  dropdownOpen.value = !dropdownOpen.value;
}

const onStatusSelect = (status: StatusOption) => {
  dropdownOpen.value = false;
  selectedStatus.value = status.value;
}

</script>

<template>
  <div class="status">
    <button
      type="button"
      @click.prevent="onDropdownToggle"
      class="status__current"
      :class="{ 'status__current--highlighted': currentStatus.value === 'NOT_WATCHING' }"
    >
      <span>{{ currentStatus.label }}</span>
      <nuxt-icon :name="currentStatus.icon" />
      <svg-icon
        name="arrow-down"
        class="status__current-toggle"
        :class="{ 'status__current-toggle--active': dropdownOpen }"
      />
    </button>
    <ul v-if="dropdownOpen" class="status__dropdown">
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        class="status__option"
      >
        <button type="button" @click.prevent="onStatusSelect(option)" class="status__option-button">
          <span>{{ option.label }}</span>
          <nuxt-icon :name="option.icon" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.status {
  position: relative;

  &__current {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background-color: color("bg", "base");
    border: 1px solid color("accent", "base");
    border-radius: 10px;
    padding: 12px 10px 12px 15px;
    z-index: 2;

    span {
      font-size: 16px;
      font-weight: 500;
      text-transform: uppercase;
      color: color("accent", "base");
    }

    svg,
    :deep(svg) {
      color: color("accent", "base");
      width: 18px;
      height: 18px;
    }

    &--highlighted {
      background-color: color("accent", "base");

      span,
      svg,
      :deep(svg) {
        // color: #554300;
        color: color("bg");
      }
    }
  }

  &__current-toggle {
    margin-left: auto;
    width: 24px !important;
    height: 24px !important;
    transition: all 0.3s $easing;

    &--active {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
    list-style: none;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #554300;
    border-radius: 0 0 10px 10px;
    background-color: color("bg", "dark");
    transform: translateY(50px);
    // padding: 10px 0 5px;
    transition: all 0.3s $easing;
    z-index: 1;
  }

  &__option {
    transition: all 0.3s $easing;

    &:hover {
      background-color: #131313;
    }

    &:first-child {
      padding-top: 10px;
    }

    &:last-child {
      padding-bottom: 5px;
    }
  }

  &__option-button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    width: 100%;
    padding: 10px 15px;
    // color: #554300;
    color: color("text");
    transition: all 0.3s $easing;

    svg {
      color: #554300;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
