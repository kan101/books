<template>
  <content-loader
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    height="500"
    width="1000"
    viewBox="0 0 265 230"
  >
    <rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
    <rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
  </content-loader>
</template>

<script lang="ts" setup>
import { ContentLoader } from 'vue-content-loader'
</script>
