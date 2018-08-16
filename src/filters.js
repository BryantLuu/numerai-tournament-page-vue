import Vue from 'vue'

Vue.filter('pluralize', (word, amount) => amount > 1 ? `${word}s` : word)
Vue.filter('round', (num, amount) => parseFloat(num) ? parseFloat(num).toFixed(amount) : num)
Vue.filter('capitalize', (word) => word[0].toUpperCase() + word.slice(1))
Vue.filter('money', (value) => {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})
