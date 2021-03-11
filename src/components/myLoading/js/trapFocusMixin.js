export default {
  mounted () {
    document.addEventListener('focusin', this.focusIn)
  },
  methods: {
    /**
     * Trap focus event
     *
     * @param event
     */
    focusIn (event) {
      if (!this.$el || !this.isActive) {
        return
      }
      console.log(this.$el)
      if (
        // Event target is the loading div element itself
        event.target === this.$el ||
        // Event target is inside the loading div
        this.$el.contains(event.target)
      ) return

      // Use container as parent when available otherwise use parent element when isFullPage is false
      let parent = this.container ? this.container : (this.isFullPage ? null : this.$el.parentElement)

      if (
        // Always prevent when loading is full screen
        this.isFullPage ||
        // When a parent exist means loader is running inside a container
        // When loading is NOT full screen and event target is inside the given container
        (parent && parent.contains(event.target))
      ) {
        event.preventDefault()
        if (this.$el) {
          // this.$el.focus()
        }
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('focusin', this.focusIn)
  }
}
