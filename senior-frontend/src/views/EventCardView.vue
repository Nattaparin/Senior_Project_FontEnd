<template>
  <div>
    <div class="flex items-center justify-center mt-8">
      <div class="flex border-2 rounded h-9">
        <input
          v-model="searchValue"
          @keydown.enter="handleSearch"
          type="text"
          class="px-4 py-2 w-80"
          placeholder="Search by Mec_name or license_plate_number..."
        />
        <button
          @click="handleSearch"
          class="flex items-center justify-center px-4 border-l"
        >
          <svg
            class="w-6 h-6 text-blue-300"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-5 p-[50px]">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'

export default {
  inject: ['GStore'],
  name: 'event-card',
  components: {
    EventCard
  },
  data() {
    return {
      searchValue: ''
    }
  },
  computed: {
    filteredEvents() {
      if (!this.searchValue) {
        // If the searchValue is empty, return the original caseList
        return this.GStore.caseList
      }
      // Filter the caseList based on the searchValue (Mec_name or license_plate_number)
      const searchValueLowerCase = this.searchValue.toLowerCase()
      return this.GStore.caseList.filter(
        (event) =>
          event.Mec_name.toLowerCase().includes(searchValueLowerCase) ||
          event.LICENSE_PLATE_NUMBER.toLowerCase().includes(
            searchValueLowerCase
          )
      )
    }
  },
  methods: {
    handleSearch() {
      // Perform the search based on the searchValue
      // You can call the API endpoint to fetch the filtered events here
      // For now, the computed property "filteredEvents" will handle the filtering.
      // If you have an API endpoint for searching, you can call it here.
    }
  }
}
</script>
