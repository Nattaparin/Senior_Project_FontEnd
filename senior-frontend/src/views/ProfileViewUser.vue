<template>
  <section
    class="absolute w-full h-full bg-fixed bg-gradient-to-r from-sky-50 to-indigo-200"
  >
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-neutral-300 border-0"
          >
            <div class="text-center mb-10">
              <span class="text-black text-2xl uppercase">Profile</span>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    v-if="GStore.loggedInUserProfile"
                    >Username: {{ GStore.loggedInUserProfile.username }}</label
                  >
                  <input
                    v-model="GStore.loggedInUserProfile.username"
                    type="text"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="New Username"
                    style="transition: all 0.15s ease 0s"
                  />
                </div>

                <div class="relative w-full mb-3">
                  <label
                    v-if="GStore.loggedInUserProfile"
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Email: {{ GStore.loggedInUserProfile.email }}</label
                  >
                  <input
                    v-model="GStore.loggedInUserProfile.email"
                    type="email"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="New Email"
                    style="transition: all 0.15s ease 0s"
                  />
                </div>

                <div class="relative w-full mb-3">
                  <label
                    v-if="GStore.loggedInUserProfile"
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Telephone Number:
                    {{ GStore.loggedInUserProfile.phoneNumber }}</label
                  >
                  <input
                    v-model="GStore.loggedInUserProfile.phoneNumber"
                    type="phoneNumber"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="New Telephone Number"
                    style="transition: all 0.15s ease 0s"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >password:</label
                  >
                  <input
                    v-model="newPassword"
                    type="password"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Password"
                    style="transition: all 0.15s ease 0s"
                  />

                  <div
                    v-if="message"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    {{ message }}
                  </div>
                  <button
                    type="button"
                    @click="
                      updateProfile(
                        GStore.loggedInUserProfile,
                        GStore.loggedInUserProfile.id
                      )
                    "
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiClient from '@/services/AxiosClient.js'
import GStore from '@/store/index'
export default {
  inject: ['GStore'],
  name: 'ProfileUser',
  data() {
    return {
      loading: true,
      message: '',
      user_profiles: [],
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newPhoneNumber: ''
    }
  },
  created() {
    if (GStore.currentUser) {
      const userId = GStore.currentUser.id.toString()
      this.loggedInUserId = userId
      this.fetchLoggedInUserProfile()
    } else {
      console.warn('GStore.currentUser is null during component creation')
    }
  },
  watch: {
    'GStore.currentUser': function (newValue) {
      if (newValue === null) {
        console.log('GStore.currentUser was set to null')
      } else {
        // handle null case
      }
    }
  },
  methods: {
    fetchLoggedInUserProfile() {
      // Assuming you have the logged-in mechanic's ID stored in a variable called 'loggedInMechanicId'
      // Make a GET request to the Flask endpoint to retrieve the mechanic profile
      console.log('loggedInUserId:', this.loggedInUserId) // Check the value here
      apiClient
        .get(`/UserPro/` + this.loggedInUserId)
        .then((response) => {
          // Handle the response with the logged-in mechanic's profile data
          console.log(response.data)
          // Update your Vue.js data with the logged-in mechanic's profile details
          GStore.loggedInUserProfile = response.data
          this.user_profiles = response.data
        })
        .catch((error) => {
          console.error(error)
          this.message = 'Failed to fetch user profile. Please try again later.'
        })
    },

    updateProfile(profile) {
      console.log('Profile passed to method:', profile)
      const data = {
        email: this.newEmail || profile.email,
        password: this.newPassword || profile.password,
        username: this.newUsername || profile.username,
        phoneNumber: this.newPhoneNumber || profile.phoneNumber
      }

      apiClient
        .put(`/userUp/${profile.id}`, data) // Use the correct endpoint for updating the mechanic's profile
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          this.message = error.response.data.message
        })
    }
  }
}
</script>
