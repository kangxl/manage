<template>
  <svg
    :height="height"
    :stroke="color"
    viewBox="0 0 38 38"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fill-rule="evenodd"
    >
      <g
        stroke-width="2"
        transform="translate(1 1)"
      >
        <circle
          cx="18"
          cy="18"
          r="18"
          stroke-opacity=".25"
        />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            dur="0.8s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          />
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    height: {
      type: Number,
      default: 64
    },
    width: {
      type: Number,
      default: 64
    }
  }
}
</script>
