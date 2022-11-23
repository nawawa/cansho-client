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
        // バックエンドAPIでアップロードするので、ローカルでは何もしない
        // Picsum でランダムに画像をとってくる

        console.log('ローカル')
        return this.$emit("input", 'https://picsum.photos/800/418');

      } else {
        // アップロードする
      }
    }
  },
}
</script>