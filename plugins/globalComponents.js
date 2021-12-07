import Vue from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { IconsPlugin } from 'bootstrap-vue'

Vue.use(IconsPlugin)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
