<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetailView', params: { id: event.id } }"
  >
    <div
      class="max-w-sm overflow-hidden rounded-xl bg-black shadow-md duration-200 hover:scale-105 hover:bg-sky-700 hover:shadow-xl mr-4"
    >
      <!-- Info card -->
      <div>
        <p class="text-medium mb-5 text-zinc-300 text-center mt-6 capitalize">
          <ls
            ><h3>ชื่อเจ้าของรถ : {{ event.Owner_name }}</h3></ls
          >
          <ls
            ><h3>รุ่นรถ : {{ event.car_Model }}</h3></ls
          >
          <ls
            ><h3>วันที่เข้ารับบริการ: {{ event.date }}</h3></ls
          >
          <ls
            ><h3 :class="statusColor">สถานะ : {{ event.car_progress }}</h3></ls
          >
        </p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: 'true'
    }
  },
  computed: {
    statusColor() {
      if (this.event.car_progress === 'อยู่ระหว่างการซ้อม') {
        return 'text-yellow'
      }
      if (this.event.car_progress === 'ส่งรถเรียบร้อย') {
        return 'text-red'
      }
      if (this.event.car_progress === 'รับรถแล้ว') {
        return 'text-green'
      }
      return ''
    }
  },
  methods: {
    getColorClass(status) {
      if (status === 'อยู่ระหว่างการซ้อม') return 'yellow'
      if (status === 'เสร็จสมบูรณ์') return 'red'
      if (status === 'รับรถแล้ว') return 'green'
      return ''
    }
  }
}
</script>
<style scoped>
.text-yellow {
  color: yellow;
}

.text-red {
  color: red;
}

.text-green {
  color: green;
}
</style>
