<template>
  <div>
    <!-- TODO：スタイルをつけるボタンの実装 エディタ全体のデザイン -->
    <client-only>
      <editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import Editor from '~/components/Materials/Post/Editor/Index.vue'
export default {
  components: {
    Editor,
  },
  data: () => ({
    content: '',
  }),
}
</script>