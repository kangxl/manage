<template>
  <button
    :disabled="buttonDisabled || loading"
    @click="handleClick"
  >
    <i
      v-if="loading"
      class="el-icon-loading"
    />
    <slot />
  </button>
</template>
<script>

export default {
  name: 'MyButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonDisabled() {
      return this.disabled || (this.elForm || {}).disabled
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
