import Vue from 'vue'
import axios from 'axios'

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.message.includes(500)) {
    window.localStorage.removeItem('user')
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
