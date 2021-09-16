<template>
  <a
    :style="cssProps"
    class="align-items-center holder mdi px-2 action"
    :class="[`mdi-${mdi}`, state.hover ? state.openClass : state.closedClass]"
    @mouseover="state.hover = true"
    @mouseleave="state.hover = false"
  ><span class="inner-text"><slot /></span></a>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    mdi: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      default: '24px'
    },
    wrapSize: {
      type: String,
      default: '32px'
    },
    size: {
      type: String,
      default: '24px'
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
      fontSize: props.size,
      // eslint-disable-next-line vue/no-dupe-keys
      iconSize: props.iconSize,
      // eslint-disable-next-line vue/no-dupe-keys
      wrapSize: props.wrapSize
    }
  },
  computed: {
    cssProps() {
      return {
        '--font-size': (this.fontSize),
        '--icon-size': (this.iconSize),
        '--wrap-size': (this.wrapSize)
      }
    }
  }
}
</script>

<style scoped>
.inner-text{
  font-size: var(--font-size);
  vertical-align: bottom;
  white-space: nowrap;
}

.holder{
  display: inline-flex;
  font-size: var(--icon-size);
  width: var(--wrap-size);
  max-width: max-content;
  overflow: hidden;
  word-wrap: normal;
}

.holder:hover{
  transition: width 0.4s linear;
  width: 100%;
  max-width: max-content;
  color: var(--light);
}
</style>
