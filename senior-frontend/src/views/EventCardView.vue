<template>
  <div class="grid grid-cols-4 gap-5 p-[50px]">
    <EventCard
      v-for="event in GStore.caseList"
      :key="event.mal_id"
      :event="event"
    />
  </div>
</template>
<script>
import EventCard from "../components/EventCard.vue";
export default {
  inject: ["GStore"],
  name: "event-card",
  components: {
    EventCard,
  },
};
</script>
