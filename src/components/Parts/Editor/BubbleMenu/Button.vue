<template>
  <v-btn 
    :class="$attrs"
    tile
    icon
    @click="$emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
}
</script>