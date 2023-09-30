<template>
  <div
    class="top-0 flex justify-between items-center px-3 md:px-6 w-full h-[60px] bg-black"
  >
    <!-- Logo Image -->

    <div
      class="text-sm font-bold leading-relaxed i -2 whitespace-nowrap uppercase text-blue-500 gap-x-3 flex flex-row drop-shadow-lg shadow-blue-600/50"
    >
      <router-link to="/">
        <img class="h-12 md:h-16" src="@/assets/logo_new.png" alt="Logo" />
      </router-link>
      <!-- <router-link to="/GenToken" v-if="GStore.currentEmail"
        >GenToken</router-link
      > -->
      <router-link to="/receive-case" class="mt-5" v-if="GStore.role == 'admin'"
        >Receive-case</router-link
      >
      <router-link
        to="/event-card"
        class="mt-5"
        v-if="
          GStore.role == 'admin' ||
          GStore.role == 'mechanic' ||
          GStore.role == 'user'
        "
        >Case</router-link
      >
      <div class="mt-5">
        <!-- เนื้อหาที่จะแสดงให้กับ Admin -->
        <router-link
          to="/profileUser"
          v-if="
            GStore.role == 'admin' ||
            GStore.role == 'mechanic' ||
            GStore.role == 'user'
          "
          >Profile</router-link
        >
      </div>
    </div>
    <!-- <div
      v-if="isAdmin || isMec || isUser"
      v-bind=""
      class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
    >
      <div class="flex items-center justify-center">
        <div class="flex border-2 rounded h-9">
          <input
            v-model="searchQuery"
            type="text"
            class="px-4 py-2 w-80"
            placeholder="Search..."
          />
          <button
            @click="handleSearch"
            class="flex items-center justify-center px-4 border-l"
          >
            <svg
              class="w-6 h-6 text-blue-300"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              />
            </svg>
          </button>
        </div>
      </div> -->
    <!-- </div> -->
    <button
      v-if="
        !GStore.currentEmail &&
        !GStore.currentMechanic &&
        !GStore.currentUser &&
        $route.name != 'login'
      "
      @click="$router.push('login')"
      class="transition duration-150 ease-in-out bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 m-3"
    >
      Login
    </button>
    <div
      class="flex flex-row items-center justify-center gap-x-[12px]"
      v-if="GStore.currentEmail || GStore.currentMechanic || GStore.currentUser"
    >
      <p class="text-white text-xs font-bold uppercase text-rose-600">
        Username:
        {{
          GStore.currentEmail?.username ||
          GStore.currentMechanic?.username ||
          GStore.currentUser?.username
        }}
      </p>

      <button
        @click="handleLogout"
        class="transition duration-150 ease-in-out bg-white text-gray-800 hover:bg-gray-300 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
      >
        logout
      </button>
    </div>
  </div>
</template>
<style>
.text-blue-500 a:hover {
  color: #ff6200; /* Replace #ff0000 with your desired hover color */
}
.text-gray-800 a:hover {
  color: #ffffff; /* Replace #ff0000 with your desired hover color */
}
</style>
<script>
import AuthService from '@/services/AuthService.js'
// import Role from '@/services/Role'
import apiClient from '@/services/AxiosClient'
// import GStore from '@/store'
// import adminRole from '@/services/Role'
export default {
  inject: ['GStore'],
  name: 'navbar-component',
  data() {
    return {
      showMenu: false,
      userRole: '',
      searchQuery: '',
      // Add a data property to store the search results
      searchResults: []
    }
  },
  // created() {
  //   const userId = 1
  //   this.getUserRoles(userId).then((role) => {
  //     this.userRole = role
  //   })
  // },
  methods: {
    handleLogout() {
      AuthService.logout()
      this.$router.push({ path: '/' })
    },
    handleSearch() {
      // Make the API request to the search endpoint with the searchQuery
      apiClient
        .get('/search', {
          params: {
            query: this.searchQuery
          }
        })
        .then((response) => {
          this.searchResults = response.data.results
        })
        .catch((error) => {
          console.error(error)
          this.searchResults = []
        })
    }
  }

  // computed: {
  //   isAdmin() {
  //     return AuthService.getUserRoles('admin')
  //   },
  //   isMec() {
  //     return AuthService.getUserRoles('mechamic')
  //   },
  //   isUser() {
  //     return AuthService.getUserRoles('user')
  //   }
  // }
  // adminRole() {
  //   apiClient
  //     .get('/get-role')
  //     .then((response) => {
  //       GStore.role = response.data.role
  //       console.log(GStore.role)
  //       // ทำสิ่งที่ต้องการกับ role ที่ได้รับ เช่นกำหนดสิทธิ์การเข้าถึงหน้าเว็บ โหลดข้อมูล ฯลฯ
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       // จัดการข้อผิดพลาดที่เกิดขึ้น
  //     })
  // },
  // userRole() {
  //   apiClient
  //     .get('/user-role')
  //     .then((response) => {
  //       GStore.user = response.data.user
  //       console.log(GStore.user)
  //       // ทำสิ่งที่ต้องการกับ role ที่ได้รับ เช่นกำหนดสิทธิ์การเข้าถึงหน้าเว็บ โหลดข้อมูล ฯลฯ
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       // จัดการข้อผิดพลาดที่เกิดขึ้น
  //     })
  // },
  //   mecRole() {
  //     return apiClient
  //       .get('/mec-role')
  //       .then((response) => {
  //         GStore.mec = response.data
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }
}
</script>
