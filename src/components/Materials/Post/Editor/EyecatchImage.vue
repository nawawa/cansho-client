<template>
  <div class="eyecatch-image">
    <v-file-input 
      v-if="eyecatchImage.src === ''"
      accept="image/*"
      hide-input
      prepend-icon="mdi-image-plus-outline"
      @change="uploadImage"
    >
    </v-file-input>
    <figure v-else>
      <img :src="eyecatchImage.src" />
    </figure>
  </div>
</template>

<script>
export default {
  model: {
    prop: "eyecatchImage",
    event: "change"
  },
  props: {
    eyecatchImage: {
      src: String
    }
  },
  methods: {
    uploadImage(selectedFile) {
      console.log(this.$config.NODE_ENV)

      if (this.$config.NODE_ENV === 'local') {
        console.log('ローカル')
      } else {
        // アップロードする
      }

      const srcValue = 'https://picsum.photos/800/418' 
      this.$emit("input", srcValue);
    }
  },
}
</script>