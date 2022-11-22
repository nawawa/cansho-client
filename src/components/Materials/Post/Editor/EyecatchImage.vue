<template>
  <div>
    <v-btn 
      v-if=" eyecatchImage.alt === '' && eyecatchImage.src === '' "
      icon 
      outlined
      color="#adb5bd"
    >
      <v-icon 
        small
        color="#adb5bd"
      >
        mdi-image-plus-outline
      </v-icon>
    </v-btn>
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