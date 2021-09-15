<template>
  <span
    :style="cssProps"
    class="align-items-center holder mdi px-2"
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
    }
  },
  setup(props) {
    const state = reactive({
      hover: false,
      closedClass: '',
      openClass: 'bg-info rounded'
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
    transition: all 0.3s linear;
}

.holder{
  display: flex;
  font-size: 24px;
  width: 32px;
  overflow: hidden;
  word-wrap: none;
    transition: all 0.3s linear;
}

.holder:hover{
  transition: all 0.3s linear;
  width: 100%;
}
</style>
