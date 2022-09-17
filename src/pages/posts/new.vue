<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
    <client-only>
      <editor v-model="content" />
      <div v-html="$sanitize(content)"></div>
    </client-only>
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
