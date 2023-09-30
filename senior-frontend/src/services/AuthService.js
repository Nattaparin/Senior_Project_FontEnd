import apiClient from '@/services/AxiosClient.js'
import GStore from '@/store'

export default {
  login(user) {
    console.log(user)
    return apiClient
      .post('/login', user)
      .then((response) => {
        console.log(response)
        if (response.data.role === 'admin') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('admin', JSON.stringify(response.data.user))
          localStorage.setItem('role', JSON.stringify(response.data.role))
          GStore.currentUser = response.data.user
          GStore.role = response.data.role
          return Promise.resolve(response.data)
        } else if (response.data.role === 'mechanic') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('mechanic', JSON.stringify(response.data.user))
          localStorage.setItem('role', JSON.stringify(response.data.role))
          GStore.currentUser = response.data.user
          GStore.role = response.data.role
          return Promise.resolve(response.data)
        } else if (response.data.role === 'user') {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('role', JSON.stringify(response.data.role))
          GStore.currentUser = response.data.user
          GStore.role = response.data.role
          return Promise.resolve(response.data)
        } else {
          return Promise.reject('Unauthorized role')
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  hasRoles(roles) {
    if (GStore.currentEmail && roles) {
      return apiClient
        .post('/check_role', { email: GStore.currentEmail })
        .then((response) => {
          let userRoles = response.data.roles
          let containRoles = userRoles.filter((role) => roles.includes(role))
          return containRoles.length > 0
        })
        .catch((error) => {
          console.error(error)
          return false
        })
    }
    return false
  },
  // hasRolesMec(roles) {
  //   if (GStore.currentMechanic && roles) {
  //     return apiClient
  //       .post('/get-roles-mec', { email: GStore.currentMechanic })
  //       .then((response) => {
  //         let userRoles = response.data.roles
  //         let containRoles = userRoles.filter((role) => roles.includes(role))
  //         return containRoles.length > 0
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //         return false
  //       })
  //   }
  //   return false
  // },
  sendMessage() {
    // Send a message to Flask API
    apiClient
      .post('/chatbot', { message: this.inputMessage })
      .then((response) => {
        // Handle the response from Flask API
        this.messages.push({ name: 'You', message: this.inputMessage })
        this.messages.push({ name: 'Sam', message: response.data.response })
        this.inputMessage = ''
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },

  getUserRoles(id) {
    if (!id) {
      console.error('ID is undefined')
      return
    }
    console.log('This is ID before calling getUserRoles: ', id)
    return apiClient
      .get(`/get-roles/${id}`)
      .then((response) => {
        console.log(response.data) // to check what the API response is
        console.log('Role set to:', GStore.role) // to check the role value
        return response.data.role
      })
      .catch((error) => {
        console.error(error)
      })
  },

  // login_mec(mechanic) {
  //   console.log(mechanic)
  //   return apiClient
  //     .post('/mec-login', mechanic)
  //     .then((response) => {
  //       console.log(response)
  //       localStorage.setItem('token', response.data.token)
  //       localStorage.setItem('mechanic', JSON.stringify(response.data.mechanic))
  //       GStore.currentMechanic = response.data.mechanic
  //       return Promise.resolve(response.data)
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error)
  //     })
  // },
  // login_user(user) {
  //   console.log(user)
  //   return apiClient
  //     .post('/user-login', user)
  //     .then((response) => {
  //       console.log(response)
  //       localStorage.setItem('token', response.data.token)
  //       localStorage.setItem('user', JSON.stringify(response.data.user))
  //       GStore.currentUser = response.data.user
  //       return Promise.resolve(response.data)
  //     })
  //     .catch((error) => {
  //       return Promise.reject(error)
  //     })
  // },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    localStorage.removeItem('mechanic')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    GStore.role = null
    GStore.currentEmail = null
    GStore.currentMechanic = null
    GStore.currentUser = null
  },
  register(user) {
    console.log(user)
    return apiClient
      .post('/register', user)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        GStore.currentUser = response.data.user
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดในการเรียก API
        console.error(error)
        throw error
      })
  },
  get_case() {
    return apiClient
      .get('/case')
      .then((response) => {
        GStore.caseList = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  get_progress() {
    return apiClient
      .get('/get_progrcess')
      .then((response) => {
        GStore.proressList = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  get_Mec() {
    return apiClient
      .get('/Mechanic')
      .then((response) => {
        GStore.currentMechanic = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getCaseData(id) {
    apiClient
      .get('/case/' + id)
      .then((response) => {
        GStore.caseList = response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // getEvent(id) {
  //   return apiClient.get('/case/' + id)
  // }
}
// check() {
//   return apiClient.get('/check')
// }
// register(user) {
//   return apiClient.post('/register', {
//     email: user.email,
//     password: user.password,
//     username: user.username,
//     phonenumber: user.phonenumber
//   })
// }
