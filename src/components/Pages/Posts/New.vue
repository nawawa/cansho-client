<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
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
    Editor,
    TitleColumn
  },
  data: () => ({
    title: '',
    content: '',
  }),
  methods: {
    focusOnEditor() {
      const editor = document.getElementsByClassName('ProseMirror')[0]
      editor.focus()
    }
  }
}
</script>