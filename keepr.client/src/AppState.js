import { reactive, ref } from 'vue'

const isMobile = ref(false)
const screenSize = ref(window.innerWidth)
window.onresize = function() {
  screenSize.value = window.innerWidth
  isMobile.value = (screenSize.value < 764)
}

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  keeps: [],
  profile: {},
  vaults: [],
  activeVault: {},
  yourVaults: [],
  activeKeep: {},
  github: {},
  screenSize,
  isMobile
})
