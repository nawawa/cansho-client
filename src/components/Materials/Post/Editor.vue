<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    editor: null
  }),
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>