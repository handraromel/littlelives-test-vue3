<script setup lang="ts">
import { ref, computed, onMounted, toRef } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useSchedulerSettings } from '@/composables/useSchedulerSettings'
import { type Settings } from '@/types'

const props = defineProps<{
  settings: Settings
}>()

const calendarRef = ref()

const settingsRef = toRef(props, 'settings')

const { events } = useSchedulerSettings(settingsRef)

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  slotMinTime: '07:00:00',
  slotMaxTime: '20:00:00',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,timeGridDay'
  },
  events: events.value,
  eventContent: (arg: any) => {
    const slotIndex = arg.event.extendedProps.slotIndex
    const backgroundColor = slotIndex % 2 === 0 ? '#4299e1' : '#63b3ed'
    const borderColor = slotIndex % 2 === 0 ? '#3182ce' : '#4299e1'

    return {
      html: `
        <div class="fc-content" style="background-color: ${backgroundColor}; border-color: ${borderColor};">
          <div class="fc-title">${arg.event.title}</div>
          ${props.settings.allowVideoCall ? '<div class="fc-video-icon">📹</div>' : ''}
        </div>
      `
    }
  },
  eventClassNames: ['custom-event']
}))

onMounted(() => {
  const calendarApi = calendarRef.value.getApi()
  calendarApi.render()
})
</script>

<template>
  <div class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
    <h2 class="mb-4 text-xl font-semibold">Your Schedule Calendar</h2>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
  </div>
</template>

<style>
.fc-timegrid-event {
  background-color: transparent !important;
  border: none !important;
}

.fc-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 4px;
  border-radius: 3px;
  height: 100%;
  box-sizing: border-box;
}

.fc-title {
  font-size: 0.8em;
  font-weight: bold;
  color: white;
}

.fc-video-icon {
  font-size: 1em;
}

.custom-event {
  margin: 1px 0;
}
</style>
