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

    <PartsEditorEyecatchImage 
      v-else 
      :src="eyecatchImage.src"
      :unsetEyecatch="unsetEyecatchImage"
    />

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
    },
    removeEyecatchImageSrcValue: Function
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
    },
    unsetEyecatchImage() {
      this.removeEyecatchImageSrcValue()
    }
  },
}
</script>