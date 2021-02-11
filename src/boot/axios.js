import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export const httpRequest = axios.create({
  baseURL: ' https://jsonplaceholder.typicode.com'
})