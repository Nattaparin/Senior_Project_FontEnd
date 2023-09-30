import { reactive } from 'vue'
export default reactive({
  // currentEmail: (() => {
  //   const storedValue = localStorage.getItem('admin')
  //   try {
  //     return JSON.parse(storedValue) || null
  //   } catch (error) {
  //     return null
  //   }
  // })(),
  // currentMechanic: (() => {
  //   const storedValue = localStorage.getItem('mechanic')
  //   try {
  //     return JSON.parse(storedValue) || null
  //   } catch (error) {
  //     return null
  //   }
  // })(),
  currentUser: JSON.parse(localStorage.getItem('user') || 'null'),
  role: JSON.parse(localStorage.getItem('role') || 'null'),
  loggedInMechanicProfile: null,
  loggedInUserProfile: null,
  caseList: null,
  caseDetail: null,
  repairList: null,
  progressList: null,
  animeList: []
  // ... other properties
})
