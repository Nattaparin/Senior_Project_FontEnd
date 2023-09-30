<template>
  <div>
    <main>
      <section class="absolute w-full h-full">
        <div
          class="absolute top-0 w-full h-full bg-grey"
          style="background-size: 100%; background-repeat: no-repeat"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-neutral-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <img
                      class="h-12 md:h-36 mx-auto"
                      src="@/assets/logo.png"
                      alt=""
                    />
                    <h1 class="mt-5 text-blue-900 text-xl font-bold uppercase">
                      Login
                    </h1>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Form @submit="handleLogin" :validation-schema="schema">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Email</label
                      ><Field
                        name="email"
                        type="text"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="email"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                        >Password</label
                      ><Field
                        name="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Password"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="text-center mt-6">
                      <div
                        v-if="message"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        {{ message }}
                      </div>
                      <button
                        class="bg-black text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        Sign In
                      </button>
                    </div>
                    <div class="text-center mt-6 text-white-300">
                      <div>
                        <router-link to="/GenToken" class="text-white-300"
                          >GET TOKEN ?</router-link
                        >
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<style>
.text-white-300 a:hover {
  color: #2600ff; /* Replace #ff0000 with your desired hover color */
}
</style>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService.js'
// import GStore from '@/store'
export default {
  name: 'LoginView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required('กรุณาเติมช่องว่างให้ครบ'),
      password: yup.string().required('กรุณาเติมช่องว่างให้ครบ')
    })
    return {
      loading: false,
      message: '',
      schema,
      role: ''
    }
  },
  methods: {
    checkRole(role) {
      AuthService.checkRole(role)
    },
    handleLogin(user) {
      AuthService.login(user)
        .then((response) => {
          console.log(response) // Check the structure of the response
          this.$router.push('/') // Redirect to home page
        })
        .catch((error) => {
          console.error(error)
          this.message = error.response.data.message
        })
    }
  },
  checkRoler(role) {
    AuthService.checkRole(role)
      .then((response) => {
        this.role = response.data.role
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
