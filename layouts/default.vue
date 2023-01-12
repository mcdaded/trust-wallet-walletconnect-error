<script lang="ts" setup>
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row overflow-hidden">
    <main
      class="p-6 w-full bg-gray-100 mx-auto overflow-hidden grow"
    >
      <div class="mx-auto max-w-5xl">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
#page-container {
  position: relative;
}
#content-wrap {
  /* padding-top: 100px; */
  padding-bottom: 150px; /* Footer height */
}
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-out;
}
.fade-enter,
.fade-leave-active {
  @apply opacity-0;
}
</style>
