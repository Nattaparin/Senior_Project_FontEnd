<template>
  <div class="text-center">
    <span
      class="mb-4 mt-16 text-1xl font-extrabold text-orange-500 leading-none tracking-tight text-orange-500 md:text-5xl lg:text-2xl dark:text-white"
    >
      อัพเดตสถานะการซ้อม
    </span>
    <hr
      class="w-48 h-3 mx-auto my-3 bg-gray-700 border-0 rounded md:my-2 dark:bg--700"
    />
    <div
      v-for="event in GStore.caseDetail"
      :key="event"
      class="relative w-full mb-1"
    >
      <label
        class="a5 block uppercase text-gray-700 text-l font-bold mb-2 mr-8"
        >{{ removeBracketsAndQuotes(event.car_symptoms) }}</label
      >
      <section class="absolute w-full h-full">
        <div class="w-full lg:w-6/12 px-4">
          <div
            class="a7 w-full mb-3 bg-gray-50 text-black border border-slate-400 border-collapse rounded-md mb-1"
          >
            <table class="w-full table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2 border border-slate-300">อะไหล่</th>
                  <th
                    class="px-4 py-2 border border-slate-300"
                    v-if="completionPercentage >= 0"
                  >
                    {{ completionPercentage }}%
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(part, index) in event.Part_type.split(',')"
                  :key="index"
                >
                  <td class="border border-slate-300 px-4 py-2">
                    {{ part.trim() }}
                  </td>
                  <td class="border border-slate-300 px-4 py-2">
                    <input
                      v-model="selectedCarSymptoms[event.id][index]"
                      :checked="selectedCarSymptoms[event.id][index]"
                      @change="updateCheckboxStatus(event.id, index, $event)"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center mt-5">
          <button
            @click="updateCaseStatusRev(event.id)"
            v-if="completionPercentage == 100 && GStore.role == 'admin'"
            class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-300"
            style="transition: all 0.15s ease 0s"
          >
            เสร็จสิ้น
          </button>
        </div>
        <!-- <div class="text-center mt-2">
          Completion: {{ completionPercentage }}%
        </div> -->
      </section>
    </div>
    <div class="a8">
      <div
        style="
          border-top: 4px solid #ffab24;
          margin-top: 0px;
          margin-bottom: 0px;
          width: 600px;
        "
      ></div>
    </div>
    <section class="absolute w-full h-full">
      <h1
        class="font-extrabold text-orange-500 text-1xl leading-none tracking-tight text-orange-500 md:text-5xl lg:text-2xl dark:text-white"
      >
        เพิ่มรายการซ้อม
      </h1>
      <div class="relative w-full mb-1">
        <label
          class="a5 block uppercase text-gray-700 text-l font-bold mb-2 mr-8"
          >ประเภทงาน</label
        >
        <ul
          class="a2 items-center w-full text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <li class="w-full">
            <div class="a flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
                id="react-checkbox-list"
                type="checkbox"
                value="เช็คระยะ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="react-checkbox-list"
                class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                >เช็คระยะ</label
              >
            </div>
          </li>
          <li class="w-full">
            <div class="a1 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
            <div class="a3 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
          class="a2 items-center w-full mt-2 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <li class="w-full">
            <div class="a flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
                id="react-checkbox-list"
                type="checkbox"
                value="เซ็คระบบสายไฟ"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="react-checkbox-list"
                class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                >เซ็คระบบสายไฟ</label
              >
            </div>
          </li>
          <li class="w-full">
            <div class="a1 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
            <div class="a3 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
          class="a2 items-center w-full mt-2 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <li class="w-full">
            <div class="a flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
                id="react-checkbox-list"
                type="checkbox"
                value="เช็คช่วงล่าง"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                for="react-checkbox-list"
                class="block ml-2 uppercase text-gray-700 text-xs font-bold"
                >เช็คช่วงล่าง</label
              >
            </div>
          </li>
          <li class="w-full">
            <div class="a1 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
            <div class="a3 flex items-center pl-3">
              <input
                v-model="selectedCarSymptoms2"
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
        <div class="a relative w-60 mb-1">
          <label
            class="block uppercase text-gray-700 text-xs font-bold mb-2"
            for="dropdown1"
            >ประเภทอะไหล</label
          >
          <select
            v-model="selectedOption"
            @change="onDropdownChange"
            id="dropdown1"
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
        <div class="a1 relative w-60 mb-3">
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
        <div class="a6 text-center mt-5">
          <button
            @click="addRow"
            class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-300"
            style="transition: all 0.15s ease 0s"
          >
            +เพิ่ม
          </button>
        </div>
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="a7 w-full mb-3 bg-gray-50 text-black border border-slate-400 border-collapse rounded-md mb-1"
        >
          <table class="w-full table-auto">
            <thead>
              <tr>
                <th class="px-4 py-2 border border-slate-300">ประเภทอะไหล่</th>
                <th class="px-4 py-2 border border-slate-300">อะไหล่</th>
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
      </div>
      <div class="text-center mt-5">
        <button
          v-for="event in GStore.caseDetail"
          :key="event"
          @click="updateCase(event.id)"
          class="bg-gray-900 text-white active:bg-gray-700 hover:bg-sky-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-300"
          style="transition: all 0.15s ease 0s"
        >
          +เพิ่มรายการ
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import apiClient from '@/services/AxiosClient'
import GStore from '@/store'

export default {
  inject: ['GStore'],
  name: 'RepairTacking',
  data() {
    return {
      selectedCarSymptoms: {},
      selectedCarSymptoms2: [],
      selectedOption: '',
      sounds: [],
      problems: [],
      tableRows: [],
      checklist: [],
      partType: '',
      carPart: '',
      carSymptoms: ''
    }
  },
  computed: {
    completionPercentage() {
      let totalTasks = 0
      let completedTasks = 0

      for (const tasks of Object.values(this.selectedCarSymptoms)) {
        totalTasks += tasks.length
        completedTasks += tasks.filter(Boolean).length
      }

      return totalTasks === 0
        ? 0
        : ((completedTasks / totalTasks) * 100).toFixed(2)
    }
  },
  watch: {
    completionPercentage(newVal) {
      // Now you can update GStore.progressList when completionPercentage changes.
      GStore.progressList = newVal
      console.log(GStore.progressList)
    }
  },
  created() {
    this.initializeSelectedCarSymptoms(),
      this.GStore.caseDetail.forEach((event) => {
        event.Part_type.split(',').forEach((part, index) => {
          const key = `checkbox_status_${event.id}_${index}`
          const status = localStorage.getItem(key)
          if (status) {
            this.selectedCarSymptoms[event.id][index] = status === 'checked'
          }
        })
      })
  },
  methods: {
    updateCheckboxStatus(eventId, index, event) {
      // เซฟสถานะของ checkbox ลงใน localStorage
      const key = `checkbox_status_${eventId}_${index}`
      localStorage.setItem(key, event.target.checked ? 'checked' : 'unchecked')

      // อัปเดทสถานะใน data ของ Vue
      this.selectedCarSymptoms[eventId][index] = event.target.checked
    },
    removeBracketsAndQuotes(text) {
      return text.replace(/[[\]']/g, '').trim()
    },
    addRow() {
      this.tableRows.push({
        selectedOption: this.selectedOption,
        sound: this.sound
      })
    },
    initializeSelectedCarSymptoms() {
      this.GStore.caseDetail.forEach((event) => {
        const parts = event.Part_type.split(',')
        this.selectedCarSymptoms[event.id] = Array(parts.length).fill(false)
      })
    },
    updateCaseStatusRev(caseId) {
      apiClient
        .post('/updateCaseStatusRev', {
          case_id: caseId
        })
        .then((response) => {
          this.$router.push({ path: '/event-card' })
          console.log(response.data.message)
        })
        .catch((error) => {
          console.error('An error occurred while updating the case:', error)
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
    },
    updateCase(eventID) {
      if (!eventID) {
        console.error('Invalid caseId')
        return
      }

      // Prepare the data to send to the Flask API
      const requestData = {
        Part_type: this.sound,
        Car_part: this.problems,
        car_symptoms: this.selectedCarSymptoms2
      }

      // Make an HTTP PUT request to the Flask API using the provided caseId
      apiClient
        .put(`/update_case/${eventID}`, requestData)
        .then((response) => {
          this.$router.push({ path: '/event-card' })
          // Handle the response from the API if needed
          console.log('Case updated:', response.data)
        })
        .catch((error) => {
          // Handle errors if the API request fails
          console.error('Error updating case:', error)
        })
    }
  }
}
// data() {
//   return {
//     role: ''
//   }
// },
// mounted() {
//   this.checkRole()
// },
// methods: {
//   checkRole() {
//     return apiClient
//       .get('/check-role')
//       .then((response) => {
//         this.role = response.data.role
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }
// }
</script>
<style scoped>
.a {
  padding: 5px 5px;
  margin: 0px 0px 0px 400px;
}
.a1 {
  padding: 5px 5px;
  margin: 0px 0px 0px 150px;
}
.a2 {
  padding: 5px 5px;
  margin: 0px 0px 0px 40px;
}
.a3 {
  padding: 5px 5px;
  margin: 0px 0px 0px -100px;
}
.a4 {
  padding: 5px 5px;
  margin: 20px -500px 0px 0px;
}
.a5 {
  padding: 5px 5px;
  margin: 0px 0px 0px -500px;
}
.a6 {
  padding: 5px 5px;
  margin: 20px 0px 0px -400px;
}
.a7 {
  padding: 5px 5px;
  margin: 0px 0px 0px 387px;
}
.a8 {
  padding: 5px 5px;
  margin: 400px 0px 0px 450px;
}
</style>
