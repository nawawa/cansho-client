<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
    <editor v-model="content" />
    <div v-html="$sanitize(content)"></div>
  </div>
</template>

<script>
import Editor from '~/components/Materials/Post/Editor.vue'
export default {
  components: {
    Editor
  },
  data: () => ({
    title: '',
    content: '',
  }),
}
</script>
