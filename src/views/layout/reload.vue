<script>
export default {
  name: 'Reload',
  mounted () {
    const { params, query } = this.$route
    const { path } = params
    setTimeout(() => {
      this.$router.replace({ path: '/' + path, query })
    }, 0)
  },
  render (h) {
    return h() // avoid warning message
  }
}
</script>
