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
              <span
                class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-blue-500 text-black text-2xl uppercase"
                >Profile</span
              >
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Username:
                    {{ GStore.loggedInMechanicProfile.username }}</label
                  >
                  <input
                    v-model="GStore.loggedInMechanicProfile.username"
                    type="text"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Username"
                    style="transition: all 0.15s ease 0s"
                  />
                  <!-- <button
                    @click="
                      updateProfile(
                        GStore.loggedInMechanicProfile,
                        GStore.loggedInMechanicProfile.id
                      )
                    "
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button> -->
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Email: {{ GStore.loggedInMechanicProfile.email }}</label
                  >
                  <input
                    v-model="GStore.loggedInMechanicProfile.email"
                    type="email"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    style="transition: all 0.15s ease 0s"
                  />
                  <!-- <button
                    @click="
                      updateProfile(
                        GStore.loggedInMechanicProfile,
                        GStore.loggedInMechanicProfile.id
                      )
                    "
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button> -->
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Password:</label
                  >
                  <input
                    v-model="GStore.loggedInMechanicProfile.password"
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
                    @click="
                      updateProfile(
                        GStore.loggedInMechanicProfile,
                        GStore.loggedInMechanicProfile.id
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
  name: 'ProfileMec',
  data() {
    return {
      loading: true,
      message: '',
      mec_profiles: []
    }
  },
  created() {
    // Perform login and obtain the mechanic's ID
    const mechanicId = GStore.currentMechanic.user_id.toString() // Obtain the mechanic's ID from the login response
    this.loggedInMechanicId = mechanicId // Set loggedInMechanicId with the mechanic's ID

    // Fetch the logged-in mechanic's profile
    this.fetchLoggedInMechanicProfile()
  },
  methods: {
    fetchLoggedInMechanicProfile() {
      // Assuming you have the logged-in mechanic's ID stored in a variable called 'loggedInMechanicId'
      // Make a GET request to the Flask endpoint to retrieve the mechanic profile
      console.log('loggedInMechanicId:', this.loggedInMechanicId) // Check the value here
      apiClient
        .get(`/MechanicPro/` + this.loggedInMechanicId)
        .then((response) => {
          // Handle the response with the logged-in mechanic's profile data
          console.log(response.data)
          // Update your Vue.js data with the logged-in mechanic's profile details
          GStore.loggedInMechanicProfile = response.data
          this.mec_profiles = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateEmail() {
      // Do nothing here since v-model is two-way binding and it automatically updates GStore.loggedInMechanicProfile.email
    },
    // fetchUserProfiles() {
    //   return apiClient
    //     .get('/MechanicPro')
    //     .then((response) => {
    //       this.mec_profiles = response.data
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // },
    updateProfile(profile) {
      const data = {
        email: profile.email,
        password: profile.password,
        username: profile.username
      }

      apiClient
        .put(`/MechanicUp/${profile.id}`, data) // Use the correct endpoint for updating the mechanic's profile
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
