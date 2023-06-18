<template>
  <section class="absolute w-full h-full">
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-neutral-300 border-0"
          >
            <div class="text-center mb-1000">
              <span
                class="box-decoration-clone bg-gradient-to-r from-indigo-600 to-Blue-500 text-black text-2xl uppercase"
                >Profile</span
              >
            </div>
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Username: </label
                  ><input
                    type="username"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Username"
                    style="transition: all 0.15s ease 0s"
                  />
                  <button
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button>
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Email: </label
                  ><input
                    type="email"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    style="transition: all 0.15s ease 0s"
                  />
                  <button
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button>
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >Password: </label
                  ><input
                    type="password"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Password"
                    style="transition: all 0.15s ease 0s"
                  />
                  <button
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  >
                    Save changes
                  </button>
                </div>

                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-infromation"
                    >License plate number: </label
                  ><input
                    type="license plate number"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="License plate"
                    style="transition: all 0.15s ease 0s"
                  />
                  <button
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
export default {
  name: "ProfileView",
};
</script>
