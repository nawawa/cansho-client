<template>
  <div class="eyecatch-image">
    <v-file-input 
      hide-input
      prepend-icon="mdi-image-plus-outline"
    >
    </v-file-input>
    <!-- <figure>
      <img>
    </figure> -->
  </div>
</template>

<script>
export default {
  model: {
    prop: "eyecatchImage",
  },
  props: {
    eyecatchImage: {
      alt: String,
      src: String
    }
  }
}
</script>