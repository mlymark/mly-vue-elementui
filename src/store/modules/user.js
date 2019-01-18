// 用户信息状态管理
const state = {
  login_password: '',
  login_name: '',
  login_token: '',
  login_time: '',
  temp_password: '',
  temp_name: '',
  avatar: '../assets/image/avatar.png'
}

const getters = {
  // Filtering currentUser
  currentUser: state => {
    return {
      token: state.login_token,
      name: state.login_name
    }
  }
}

const mutations = {
  updateLoginData (state, payload) {
    console.log(payload)
    state.login_name = payload.userName
    state.login_token = payload.token
    if (payload.avatar) {
      state.avatar = payload.avatar
    }
    state.login_time = new Date()
  },
  logout (state) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    state.login_token = ''
    state.login_name = ''
  }
}

const actions = {
  /**
   * Login
   * new Promise((resolve, reject) => {})
   * Authorization: 'Bearer ' + token
   * pass: payload.pass
   * name: payload.name
   */
  login ({commit}, payload) {
    return new Promise((resolve, reject) => {})
  },
  /**
   * Register
   * new Promise((resolve, reject) => {})
   * email: payload.email
   * pass: payload.pass
   * name: payload.name
   */
  register ({commit}, payload) {
    return new Promise((resolve, reject) => {})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
