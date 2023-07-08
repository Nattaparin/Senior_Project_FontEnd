<template>
  <router-link
    class="event-link"
    :to="{ name: 'Event', params: { id: event.id } }"
  >
    <div
      class="max-w-sm overflow-hidden rounded-xl bg-black shadow-md duration-200 hover:scale-105 hover:shadow-xl mr-4"
    >
      <!-- Info card -->
      <div>
        <p class="text-medium mb-5 text-gray-700 text-center mt-6 capitalize">
          <ls
            ><h3>ชื่อเจ้าของรถ : {{ event.Username }}</h3></ls
          >
          <ls
            ><h3>รุ่นรถ : {{ event.carmodel }}</h3></ls
          >
          <ls
            ><h3>หมายเลขทะเบียน : {{ event.licenseplate }}</h3></ls
          >
          <ls
            ><h3>ช่างที่ดูแล : {{ event.mechanic }}</h3></ls
          >
        </p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: "true",
    },
  },
};
</script>
