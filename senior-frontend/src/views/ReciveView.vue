<template>
  <section class="absolute w-full h-full">
    <div class="container mx-auto my-10 px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-8/12 px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-1 shadow-lg rounded-lg bg-neutral-300"
          >
            <div class="text-center mb-1000">
              <span class="text-black text-2xl uppercase">Receive Case</span>
            </div>
            <div class="flex-auto px-4 lg:px-10 py-0 pt-0">
              <form @submit="createCase">
                <div class="relative w-full mb-1">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="Owner_name"
                    >ชื่อเจ้าของรถ</label
                  >
                  <input
                    v-model="Owner_name"
                    type="text"
                    id="Owner_name"
                    class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="ชื่อเจ้าของรถ"
                    style="transition: all 0.15s ease 0s"
                  />
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-auto w-full mb-1 group">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="car-model"
                      >รุ่นรถ</label
                    >
                    <input
                      v-model="carModel"
                      type="text"
                      id="car-model"
                      class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="รุ่นรถ"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>

                  <div class="relative z-auto w-full mb-1 group">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="license-plate-number"
                      >หมายเลขทะเบียน</label
                    >
                    <input
                      v-model="licensePlateNumber"
                      type="text"
                      id="license-plate-number"
                      class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="หมายเลขทะเบียน"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative w-full mb-1">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="telephone-number"
                      >เบอร์โทร</label
                    >
                    <input
                      v-model="telephoneNumber"
                      type="text"
                      id="telephone-number"
                      class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="เบอร์โทร"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                  <div class="relative w-full mb-1">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="date-picker"
                    >
                      วันที่ (mm/dd/yyyy)
                    </label>
                    <input
                      v-model="selectedDate"
                      type="date"
                      id="date-picker"
                      class="border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="วันที่ (ด/ว/ป)"
                      style="transition: all 0.15s ease 0s"
                    />
                  </div>
                </div>
                <div class="relative w-full mb-1">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    >ประเภทงาน</label
                  >
                  <ul
                    class="items-center w-full text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="vue-checkbox-list"
                          type="checkbox"
                          value="เช็คระยะ"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="vue-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เช็คระยะ</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="react-checkbox-list"
                          type="checkbox"
                          value="เช็คเครื่องยนต์"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="react-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เช็คเครื่องยนต์</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="angular-checkbox-list"
                          type="checkbox"
                          value="เปลี่ยนถ่ายของเหลว"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="angular-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เปลี่ยนถ่ายของเหลว</label
                        >
                      </div>
                    </li>
                    <!-- <li class="w-full dark:border-gray-600">
                      <div class="flex items-center pl-3">
                        <input
                          id="laravel-checkbox-list"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="laravel-checkbox-list"
                          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >Laravel</label
                        >
                      </div>
                    </li>-->
                  </ul>
                  <ul
                    class="items-center w-full mt-2 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="vue-checkbox-list"
                          type="checkbox"
                          value="เซ็คระบบสายไฟ"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="vue-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เซ็คระบบสายไฟ</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="react-checkbox-list"
                          type="checkbox"
                          value="ซ้อมตัวถัง, ซ้อมสี"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="react-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >ซ้อมตัวถัง, ซ้อมสี</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="angular-checkbox-list"
                          type="checkbox"
                          value="เตรียมความพร้อมก่อนขึ้น Dyno<"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="angular-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เตรียมความพร้อมก่อนขึ้น Dyno</label
                        >
                      </div>
                    </li>
                  </ul>
                  <ul
                    class="items-center w-full mt-2 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="vue-checkbox-list"
                          type="checkbox"
                          value="เช็คช่วงล่าง"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="vue-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >เช็คช่วงล่าง</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="react-checkbox-list"
                          type="checkbox"
                          value="Modify"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="react-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >Modify</label
                        >
                      </div>
                    </li>
                    <li class="w-full">
                      <div class="flex items-center pl-3">
                        <input
                          v-model="selectedCarSymptoms"
                          id="angular-checkbox-list"
                          type="checkbox"
                          value="อื่นๆ..."
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="angular-checkbox-list"
                          class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                          >อื่นๆ...</label
                        >
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="grid md:grid-cols-3 md:gap-6 mb-2">
                  <div class="relative w-full mb-1">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="dropdown1"
                      >ประเภทอะไหล</label
                    >
                    <select
                      v-model="selectedOption"
                      @change="onDropdownChange"
                      iid="dropdown1"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select a technician"
                      style="transition: all 0.15s ease 0s"
                    >
                      <option value="ชิ้นส่วนบอดี้">ชิ้นส่วนบอดี้</option>
                      <option value="ช่วงล่าง">ช่วงล่าง</option>
                      <option value="อุปกรณ์ภายในห้องเครื่อง">
                        อุปกรณ์ภายในห้องเครื่อง
                      </option>
                      <option value="ภายใน">ภายใน</option>
                      <option value="ของเหลว">ของเหลว</option>
                    </select>
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-gray-700 text-xs font-bold mb-2"
                      for="dropdown2"
                      >อะไหล่</label
                    >
                    <select
                      v-model="sound"
                      id="dropdown2"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="อะไหล่ที่เกี่ยวข้อง"
                      style="transition: all 0.15s ease 0s"
                    >
                      <option v-for="sound in sounds" :key="sound">
                        {{ sound }}
                      </option>
                    </select>
                  </div>
                  <div class="text-center mt-5">
                    <button
                      @click="addRow"
                      class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-300"
                      style="transition: all 0.15s ease 0s"
                    >
                      +เพิ่ม
                    </button>
                  </div>
                </div>
                <div
                  class="w-full mb-3 bg-gray-50 text-black border border-slate-400 border-collapse rounded-md mb-1"
                >
                  <table class="w-full table-auto">
                    <thead>
                      <tr>
                        <th class="px-4 py-2 border border-slate-300">
                          ประเภทอะไหล่
                        </th>
                        <th class="px-4 py-2 border border-slate-300">
                          อะไหล่
                        </th>
                        <th class="px-4 py-2 border border-slate-300">...</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in tableRows" :key="index">
                        <td class="border border-slate-300 px-4 py-2">
                          {{ row.selectedOption }}
                        </td>
                        <td class="border border-slate-300 px-4 py-2">
                          {{ row.sound }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="relative w-full mb-1">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="technicians"
                    >ชื่อช่างที่ดูแล</label
                  >
                  <select
                    v-model="mec_name"
                    id="technicians"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select a technician"
                    style="transition: all 0.15s ease 0s"
                  >
                    <option value="technicians" disabled selected>
                      Select a technician
                    </option>
                    <option
                      v-for="technician in technicians"
                      :key="technician"
                      :value="technician"
                    >
                      {{ technician }}
                    </option>
                  </select>
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="car-symptoms"
                    >รายละเอียดอาการ</label
                  >
                  <textarea
                    v-model="car_detail"
                    id="car-symptoms"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="รายละเอียดอาการ"
                    style="transition: all 0.15s ease 0s"
                  ></textarea>
                </div>
                <div class="text-center mt-6">
                  <button
                    type="submit"
                    class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    style="transition: all 0.15s ease 0s"
                  >
                    Create Case
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
import apiClient from '@/services/AxiosClient'
export default {
  name: 'ReceiveView',
  data() {
    return {
      Owner_name: '',
      carModel: '',
      licensePlateNumber: '',
      telephoneNumber: '',
      selectedCarSymptoms: [],
      car_detail: '',
      mec_name: null, // เพิ่มฟิลด์ mec_name
      technicians: [],
      selectedOption: '',
      sounds: [],
      problems: [],
      mec_id: null,
      sound: '',
      tableRows: [],
      checklist: [],
      selectedDate: null // Store the selected date
    }
  },
  created() {
    this.fetchTechnicians()
  },
  methods: {
    addRow() {
      this.tableRows.push({
        selectedOption: this.selectedOption,
        sound: this.sound
      })
    },
    // Fetch technicians from the Flask API
    fetchTechnicians() {
      apiClient
        .get('/Mechanic')
        .then((response) => {
          this.technicians = response.data
          console.log('Technicians fetched:', this.technicians)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    // ส่งข้อมูลเพื่อสร้างเคสใหม่
    createCase(event) {
      event.preventDefault()
      console.log('Value of mec_name:', this.mec_name)
      if (
        !this.Owner_name ||
        !this.carModel ||
        !this.licensePlateNumber ||
        !this.telephoneNumber ||
        !this.mec_name
      ) {
        // Show an alert message if any of the required fields are empty
        alert('กรุณาเติมช่องว่างให้ครบ')
        return // Exit the function and prevent form submission
      }
      const caseData = {
        Owner_name: this.Owner_name, // แก้ชื่อตามฟอร์มใน Flask
        car_Model: this.carModel,
        LICENSE_PLATE_NUMBER: this.licensePlateNumber,
        phoneNumber: this.telephoneNumber,
        car_symptoms: this.selectedCarSymptoms,
        car_detail: this.car_detail,
        Part_type: this.sound,
        Car_part: this.problems,
        date: this.selectedDate,
        Mec_name: this.mec_name // เพิ่ม mec_name
      }

      return apiClient
        .post('/registerCase', caseData)
        .then((response) => {
          console.log(response.data)
          // ทำสิ่งที่ต้องการเมื่อสร้าง Case สำเร็จ
          this.$router.push({ path: '/event-card' })
        })
        .catch((error) => {
          console.error(error)
          // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดในการสร้าง Case
        })
    },
    onDropdownChange() {
      // ดึงข้อมูลเสียงจาก Flask API โดยใช้ Axios
      apiClient
        .get('/sounds/' + this.selectedOption)
        .then((response) => {
          this.sounds = response.data
        })
        .catch((error) => {
          console.error(error)
        })

      // ดึงข้อมูลอาการจาก Flask API โดยใช้ Axios
      apiClient
        .get('/problems/' + this.selectedOption)
        .then((response) => {
          this.problems = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
