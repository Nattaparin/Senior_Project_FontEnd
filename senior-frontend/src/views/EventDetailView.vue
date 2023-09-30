<template>
  <div class="text-center">
    <span
      class="mb-4 mt-16 text-1xl font-extrabold text-orange-500 leading-none tracking-tight text-orange-500 md:text-5xl lg:text-2xl dark:text-white"
    >
      CAR CASE INFORMATION
    </span>
    <hr
      class="w-48 h-3 mx-auto my-3 bg-gray-700 border-0 rounded md:my-2 dark:bg--700"
    />
    <section class="absolute w-full h-full">
      <!-- <div
        class="absolute top-0 w-full h-full bg-black"
        style="background-size: 100%; background-repeat: no-repeat"
      ></div> -->
      <div class="container mx-auto px-4 h-full">
        <div class="flex justify-center h-full">
          <div class="w-full lg:w-4/12 px-4">
            <div
              class="relative flex flex-col min-w-0 break-words w-full mb-8 rounded-lg bg-white border-0"
            >
              <div v-for="event in GStore.caseDetail" :key="event">
                <div class="grid md:grid-cols-2 md:gap-2 mb-6">
                  <div class="relative z-auto w-full mb-6 group">
                    <label
                      class="block uppercase text-white-300 text-xs font-bold mb-2"
                    >
                      ชื่อเจ้าของรถ: {{ event.Owner_name }}
                    </label>
                  </div>
                  <div class="relative z-auto w-full mb-6 group">
                    <label
                      class="block uppercase text-white-300 text-xs font-bold mb-2"
                    >
                      วันที่เข้ารับบริการ: {{ event.date }}
                    </label>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6 mb-6">
                  <div class="relative z-auto w-full mb-6 group">
                    <label
                      class="block uppercase text-white-300 text-xs font-bold mb-2"
                    >
                      หมายเลขทะเบียน: {{ event.LICENSE_PLATE_NUMBER }}
                    </label>
                  </div>
                  <div class="relative z-auto w-full mb-6 group">
                    <label
                      class="block uppercase text-white-300 text-xs font-bold mb-2"
                    >
                      รุ่นรถ: {{ event.car_Model }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="grid md:grid-cols-1 md:gap-6 mb-6">
                <div v-for="event in GStore.caseDetail" :key="event">
                  <label
                    class="block uppercase text-white-300 text-xs font-bold mb-2"
                  >
                    ช่างที่ดูแล: {{ event.Mec_name }}
                  </label>
                </div>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6 mb-6">
                <div v-for="event in GStore.caseDetail" :key="event">
                  <label
                    class="block uppercase text-white-300 text-xs font-bold mb-2"
                  >
                    ประเภทงาน:
                    <br />
                    {{ removeBracketsAndQuotes(event.car_symptoms) }}
                  </label>
                </div>
                <div v-for="event in GStore.caseDetail" :key="event">
                  <label
                    class="block uppercase text-white-300 text-xs font-bold mb-2"
                  >
                    อะไหล่: <br />{{ event.Part_type }}
                  </label>
                </div>
              </div>
              <div v-for="event in GStore.caseDetail" :key="event">
                <label
                  class="block uppercase text-white-300 text-xs font-bold mb-2"
                >
                  รายละเอียดอาการ: <br />{{ event.car_detail }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <div class="a grid md:grid-cols-3 md:gap-6 mb-6 w-200">
        <div v-for="event in GStore.caseDetail" :key="event.id">
          <h1
            :class="{
              'blue-text': event.car_progress == 'รับรถแล้ว'
            }"
            class="a1"
          >
            รับเคสเรียบร้อย >>
          </h1>
        </div>
        <div v-for="event in GStore.caseDetail" :key="event.id">
          <h1
            :class="{
              'blue-text': event.car_progress == 'อยู่ระหว่างการซ้อม'
            }"
            class="a2"
          >
            อยู่ระหว่างการซ้อม >>
          </h1>
        </div>
        <div>
          <h1 class="a3">ส่งรถเรียบร้อย >></h1>
        </div>
      </div>
      <div class="a5 grid md:grid-cols-2 md:gap-6 mb-6 w-200">
        <div class="a4" v-for="event in GStore.caseDetail" :key="event">
          -{{ event.car_symptoms }}
        </div>
        <div class="a6" v-if="GStore.progressList">
          {{ GStore.progressList }}%
        </div>
      </div>
      <div v-for="event in GStore.caseDetail" :key="event.id">
        <div v-if="event.Part_type">
          <div
            class="a7"
            v-for="(part, index) in event.Part_type.split(',')"
            :key="index"
          >
            {{ part.trim() }}
          </div>
        </div>
      </div>
      <div v-if="GStore.role == 'admin' || GStore.role == 'mechanic'">
        <div v-for="event in GStore.caseDetail" :key="event">
          <router-link
            :to="{ name: 'Repair', params: { id: event ? event.id : '' } }"
          >
            <button
              @click="updateCaseStatus(event.id)"
              class="text-white bg-gray-700 hover:bg-sky-700 active:bg-gray-700 text-sm font-bold uppercase rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 h-100 w-30"
            >
              อัพเดตสถานะ
            </button>
          </router-link>
        </div>
      </div>
    </section>
    <!-- <span>{{ GStore.caseList }}</span> -->
  </div>
  <!-- <div>
    <span v-for="event in GStore.caseDetail" :key="event">{{
      event.car_symptoms
    }}</span>
  </div> -->
</template>

<script>
import apiClient from '@/services/AxiosClient'
// import completionPercentage from '@/views/RepairTacking'
import GStore from '@/store'
// import AuhtService from '@/services/AuthService'
export default {
  inject: ['GStore'],
  name: 'EventDetailView',
  props: {
    progressList: {
      type: String, // or whatever type it is
      required: true
    }
  },
  created() {
    console.log(GStore.progressList)
  },
  data() {
    return {
      currentProgress: ''
    }
  },
  methods: {
    removeBracketsAndQuotes(text) {
      return text.replace(/[[\]']/g, '').trim()
    },
    get_progress() {
      console.log(this.currentProgress)
      return apiClient
        .get('/get_progrcess')
        .then((response) => {
          this.currentProgress = response.data // assuming response.data is the string you want to compare
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateCaseStatus(caseId) {
      apiClient
        .post('/updateCaseStatus', {
          case_id: caseId
        })
        .then((response) => {
          console.log(response.data.message)
        })
        .catch((error) => {
          console.error('An error occurred while updating the case:', error)
        })
    }
  },
  mounted() {
    this.get_progress() // calling the method when the component is mounted
  }
  // get_progress() {
  //   AuhtService.get_progress()
  // }
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
.blue-text {
  color: rgb(0, 149, 255);
  font-size: larger;
  margin: auto;
}
.a {
  padding: 5px 5px;
  margin: 20px 0px 0px 50px;
}
.a1 {
  padding: 5px 5px;
  margin: 0px -650px 0px 0px;
}
.a2 {
  padding: 5px 5px;
  margin: 0px 0px 0px 0px;
}
.a3 {
  padding: 5px 5px;
  margin: 0px 0px 0px -650px;
}
.a4 {
  padding: 5px 5px;
  margin: 20px -500px 0px 0px;
}
.a5 {
  padding: 5px 5px;
  margin: 0px 0px 0px 0px;
}
.a6 {
  padding: 5px 5px;
  margin: 20px 0px 0px -400px;
}
.a7 {
  padding: 5px 5px;
  margin: 0px 0px 0px -260px;
}
.a8 {
  padding: 5px 5px;
  margin: 400px 0px 0px 450px;
}
</style>
