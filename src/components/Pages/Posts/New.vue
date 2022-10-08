<template>
  <div class="post-width">
    <client-only>
      <title-column v-model="title" @enter="focusOnEditor" />
      <editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import TitleColumn from '~/components/Materials/Post/Editor/Title.vue'
import Editor from '~/components/Materials/Post/Editor/Index.vue'
export default {
  components: {
    TitleColumn,
    Editor,
  },
  data: () => ({
    editorElement: null,
    content: '',
    title: ''
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
  },
  destroyed() {
    window.removeEventListener('DOMContentLoaded', this.getEditorElement, false)
  }
}
</script>