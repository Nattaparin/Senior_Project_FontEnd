<template>
  <div class="text-center bg-cover bg-gradient-to-r from-sky-50 to-indigo-200">
    <label
      class="my-0 text-6xl font-extrabold text-grey-900 leading-none tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-white"
      >Welcome To Chat gpt engaging garage
    </label>
    <li class="my-10 grid md:grid-cols-2 md:gap-2">
      <a
        class="backdrop-blur-xl bg-white/60 ml-20 mb-5 flex flex-col items-center bg-white border border-blue-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="../assets/wiring.png"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Wiring สายไฟมาตรฐานสากลที่ใช้ในเครื่องบิน
          </h5>
          <p
            class="mb-2 font-normal text-justify text-gray-700 dark:text-gray-400"
          >
            เดินระบบสายไฟใหม่ทั้งคันด้วยสายไฟมาตรฐานสากลและยังสามารถทําระบบสายไฟสําหรับรถที่มีการเพิ่มประสิทธิภาพ
            เครื่องยนต์ ไม่ว่าจะเป็น ECU SHOP, AEM, ELITE, MAxxEcu, Link, motec
            และกล่องอื่นๆอีกมากมาย
          </p>
        </div>
      </a>
      <a
        class="backdrop-blur-xl bg-white/60 ml-20 mb-5 flex flex-col items-center bg-white border border-blue-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="../assets/supercar.jpg"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            รถบ้านทั่วไปจนถึงรถหรูก็สามารภเข้ามาใช้บริการที่เราได้
          </h5>
          <p
            class="mb-2 font-normal text-justify text-gray-700 dark:text-gray-400"
          >
            Ferrari 488 เข้ามาตรวจเช็คระบบไฟมีปัญหาเนื่องจากจอดทิ้งไว้จนแบตหมด
            และมีอาการไฟengin โชว์ เราทําการแก้ไขและส่งมอบให้ลูกค้าแล้ว
          </p>
        </div>
      </a>
      <a
        class="backdrop-blur-xl bg-white/60 ml-20 mb-5 flex flex-col items-center bg-white border border-blue-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="../assets/tackcare.jpg"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            เราดูแลรถทุกท่านด้วยใจที่รักบริการและมีบริการแชทบอทสําหรับลูกค้า
          </h5>
          <p
            class="mb-2 font-normal text-justify text-gray-700 dark:text-gray-400"
          >
            เราดูแลรถของทุกท่านอย่างดีด้วยเครื่องมือและอุปกรณ์ที่ได้มาตรฐาน และ
            ยังมีบริการแชทบอกให้ลูกค้าสอบถามปัญหาต่างๆหรือติดตามรถของท่านที่เข้ารับบริการได้ตลอดเวลา
          </p>
        </div>
      </a>
      <a
        class="backdrop-blur-xl bg-white/60 ml-20 mb-5 flex flex-col items-center bg-white border border-blue-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="../assets/tuning.jpg"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            เรามีที่ช่างที่พร้อมจะให้บริการลูกค้าได้ตลอดและได้ทุกรูปแบบ
          </h5>
          <p
            class="mb-2 font-normal text-justify text-gray-700 dark:text-gray-400"
          >
            เรามีทีมช่างที่มีความชํานาญในด้านต่างๆแยกกันไปเพื่อที่จะ
            ให้รถที่เข้ามาใช้บริการนั้นสามารถเสร็จได้ไวภายในระยะเวลาที่ทีมช่างนั้นมีการบอกไว
          </p>
        </div>
      </a>
    </li>
    <FooterComponent />
    <ChatboxFooter
      v-if="GStore.role !== 'mechanic' && GStore.role !== 'admin'"
    />
    <!-- Footer -->
    <!-- <footer class="mb-9 bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div
        class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
      >
        <span
          class="mb-1 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <svg
            class="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z"
            />
          </svg>
          ช่องทางติดต่อ: 0911111111
        </span>
        <ul
          class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
        >
          <li>
            <h1
              class="mb-1 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Open Daily
            </h1>
            <ln
              ><h1
                class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                9.00 AM - 5.00 PM
              </h1></ln
            >
          </li>
        </ul>
      </div>
    </footer> -->
  </div>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue'
import ChatboxFooter from '@/components/ChatBox.vue'
export default {
  inject: ['GStore'],
  components: {
    FooterComponent,
    ChatboxFooter
  },
  name: 'login-page'
}
</script>
