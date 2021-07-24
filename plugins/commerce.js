// plugins/commerce.js
import Commerce from '@chec/commerce.js'
import Vue from 'vue'

Vue.prototype.$commerce = (typeof process.env.VUE_APP_CHEC_PUBLIC_KEY !== 'undefined')
? new Commerce(process.env.VUE_APP_CHEC_PUBLIC_KEY, true)
: null;