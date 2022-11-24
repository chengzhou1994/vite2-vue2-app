import Vue from 'vue'
import empty from './empty'
import format from './format'
import screenfull from './screenfull'
import badge from './badge'
import debounce from './debounce'

// import other directives
const directives = {
  empty,
  format,
  screenfull,
  badge,
  debounce
  // other directives
}

Object.keys(directives).forEach((name) => Vue.directive(name, directives[name]))
