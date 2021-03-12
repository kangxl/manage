<template>
  <svg
    :fill="color"
    :height="height"
    viewBox="0 0 30 30"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      height="5"
      width="4"
      x="0"
      y="13"
    >
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
    <rect
      height="5"
      width="4"
      x="10"
      y="13"
    >
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0.15s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
    <rect
      height="5"
      width="4"
      x="20"
      y="13"
    >
      <animate
        attributeName="height"
        attributeType="XML"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
        values="5;21;5"
      />
      <animate
        attributeName="y"
        attributeType="XML"
        begin="0.3s"
        dur="0.6s"
        repeatCount="indefinite"
        values="13; 5; 13"
      />
    </rect>
  </svg>

</template>
<script>
export default {
  name: 'Bars',
  props: {
    color: {
      type: String,
      default: '#000'
    },
    height: {
      type: Number,
      default: 40
    },
    width: {
      type: Number,
      default: 40
    }
  }
}
</script>
