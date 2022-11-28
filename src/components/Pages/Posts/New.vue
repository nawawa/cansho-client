<template>
  <div class="post-width">
    <client-only>
      <eyecatch 
        v-model="eyecatchImage" 
        @input="setEyecatchImageSrcValue"
        :removeEyecatchImageSrcValue="removeEyecatchImageSrcValue"
      />
      <title-column v-model="title" @enter="focusOnEditor" />
      <editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import Eyecatch from '~/components/Materials/Post/Editor/Eyecatch/Index.vue'
import TitleColumn from '~/components/Materials/Post/Editor/Title.vue'
import Editor from '~/components/Materials/Post/Editor/Index.vue'
export default {
  components: {
    Eyecatch,
    TitleColumn,
    Editor,
  },
  data: () => ({
    editorElement: null,
    content: '',
    title: '',
    eyecatchImage: {
      src: ''
    }
  }),
  mounted() {
    /**
     * client-only のためDOMのレンダリングが終了してからイベントを付与する
     */
    window.addEventListener('DOMContentLoaded', this.getEditorElement, false)
  },
  methods: {
    getEditorElement() {
      this.editorElement = document.getElementsByClassName('ProseMirror')[0]
    },
    /**
     * タイトル欄でエンターしたらエディタへフォーカスを移動する
     */
    focusOnEditor() {
      this.editorElement.focus()
    },
    setEyecatchImageSrcValue(srcValue) {
      this.eyecatchImage.src = srcValue
    },
    removeEyecatchImageSrcValue() {
      this.eyecatchImage.src = ''
    }
  },
  destroyed() {
    window.removeEventListener('DOMContentLoaded', this.getEditorElement, false)
  }
}
</script>