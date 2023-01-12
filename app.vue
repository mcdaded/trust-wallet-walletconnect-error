<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>Trust Sample</Title>
    </Head>

    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
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
</style>
