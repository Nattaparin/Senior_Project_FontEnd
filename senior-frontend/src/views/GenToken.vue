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
                    <h1 class="mt-5 text-blue-900 text-sm font-bold uppercase">
                      Request Token
                    </h1>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Form @submit="sendToken">
                    <div class="text-center mt-6">
                      <div class="relative w-full mb-3">
                        <Field
                          v-model="email"
                          required
                          name="email"
                          type="email"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="email"
                          style="transition: all 0.15s ease 0s"
                        />
                        <ErrorMessage name="email" class="error-feedback" />
                      </div>
                      <p
                        v-if="message"
                        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        {{ message }}
                      </p>
                      <button
                        class="bg-black text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        Submit
                      </button>
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
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import apiClient from '@/services/AxiosClient'
export default {
  name: 'GenToken',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      Token: yup.string().required('Token is required!')
    })
    return {
      loading: false,
      message: '',
      email: '',
      schema
    }
  },
  methods: {
    sendToken() {
      apiClient
        .post('/send-token', { email: this.email })
        .then((response) => {
          this.message = response.data.message
          this.$router.push({ path: '/sign-up' })
        })
        .catch((error) => {
          this.message = error.response.data.message
        })
    }
  }
}
</script>
