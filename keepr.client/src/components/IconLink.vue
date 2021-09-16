<template>
  <span
    :style="cssProps"
    class="align-items-center holder mdi px-2 action"
    :class="[`mdi-${mdi}`, state.hover ? state.openClass : state.closedClass]"
    @mouseover="state.hover = true"
    @mouseleave="state.hover = false"
  ><span class="inner-text"><slot /></span></span>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    mdi: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    },
    closed: {
      type: String,
      default: 'text-dark'
    },
    open: {
      type: String,
      default: 'bg-info'
    }
  },
  setup(props) {
    const state = reactive({
      hover: false,
      closedClass: props.closed,
      openClass: props.open + ' rounded'
    })
    return {
      state,
      fontSize: String(props.size) + 'px'
    }
  },
  computed: {
    cssProps() {
      return {
        '--font-size': (this.fontSize)
      }
    }
  }
}
</script>

<style scoped>
.inner-text{
  font-size: var(--font-size);
  vertical-align: bottom;
}

.holder{
  display: flex;
  font-size: 24px;
  width: 32px;
  max-width: max-content;
  overflow: hidden;
  word-wrap: none;
}

.holder:hover{
  transition: width 0.4s linear;
  width: 100%;
  max-width: max-content;
}
</style>
