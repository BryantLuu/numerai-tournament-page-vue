import Vue from 'vue'

Vue.filter('pluralize', (word, amount) => amount > 1 ? `${word}s` : word)
Vue.filter('round', (num, amount) => parseFloat(num) ? parseFloat(num).toFixed(amount) : num)
Vue.filter('capitalize', (word) => word[0].toUpperCase() + word.slice(1))
