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
                    <h1 class="text-blue-900 text-xl font-bold uppercase">
                      Sign Up
                    </h1>
                  </div>
                  <hr class="mt-6 border-b-1 border-gray-400" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Form @submit="handleRegister" :validation-schema="schema">
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="Token"
                        >Toeken</label
                      >
                      <Field
                        v-model="formData.Token_user"
                        name="Token"
                        type="Token"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Token"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="password"
                        >Password</label
                      ><Field
                        v-model="formData.password"
                        name="password"
                        type="password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="password"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="password" class="error-feedback" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="username"
                        >Username</label
                      ><Field
                        v-model="formData.username"
                        name="username"
                        type="username"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="username"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="username" class="error-feedback" />
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="phoneNumber"
                        >Telephone number</label
                      ><Field
                        v-model="formData.phoneNumber"
                        name="phoneNumber"
                        type="phoneNumber"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Telephone number"
                        style="transition: all 0.15s ease 0s"
                      />
                      <ErrorMessage name="phoneNumber" class="error-feedback" />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        :disabled="loading"
                        type="submit"
                        style="transition: all 0.15s ease 0s"
                      >
                        <span
                          v-show="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        Create an account
                      </button>
                    </div>
                  </Form>
                  <div
                    v-if="message"
                    class="alert"
                    :class="successful ? 'alert-success' : 'alert-danger'"
                  >
                    {{ message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<!-- <template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="Token">token</label>
            <Field name="Token" type="Token" class="form-control" />
            <ErrorMessage name="Token" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="username">username</label>
            <Field name="username" type="username" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="phonenumber">phonenumber</label>
            <Field name="phonenumber" type="phonenumber" class="form-control" />
            <ErrorMessage name="phonenumber" class="error-feedback" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block color" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template> -->
<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/AuthService.js'
export default {
  name: 'SignUpView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      Token: yup.string().required('กรุณาเติมช่องว่างให้ครบ'),
      password: yup.string().required('กรุณาเติมช่องว่างให้ครบ'),
      username: yup.string().required('กรุณาเติมช่องว่างให้ครบ!'),
      phoneNumber: yup.string().required('กรุณาเติมช่องว่างให้ครบ')
    })

    // Initialize the formData object to hold the user input
    const formData = {
      Token_user: '',
      password: '',
      username: '',
      phoneNumber: ''
    }

    return {
      successful: false,
      loading: false,
      message: '',
      schema,
      formData // Add the formData property to the component's data
    }
  },
  methods: {
    handleRegister() {
      // Use this.formData to access the form data
      console.log(this.formData)
      AuthService.register(this.formData)
        .then(() => {
          this.$router.push({ path: '/login' })
        })
        .catch((error) => {
          this.message = error.response.data.message
        })

      this.message = ''
      this.successful = false
    }
  }
}
</script>
