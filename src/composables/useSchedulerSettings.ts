import { computed, type Ref } from 'vue'
import { type Settings, type CalendarEvent } from '@/types'
import { calendarDays } from '@/constant'

export function useSchedulerSettings(settings: Ref<Settings>) {
  const events = computed(() => {
    const allEvents: CalendarEvent[] = []

    for (const [day, slots] of Object.entries(settings.value.availability)) {
      const dayIndex = calendarDays.indexOf(day.toLowerCase())

      for (const slot of slots) {
        const [startHour, startMinute] = slot.start.split(':').map(Number)
        const [endHour, endMinute] = slot.end.split(':').map(Number)

        const startDate = new Date()
        startDate.setDate(startDate.getDate() + ((dayIndex + 7 - startDate.getDay()) % 7))
        startDate.setHours(startHour, startMinute, 0, 0)

        const endDate = new Date(startDate)
        endDate.setHours(endHour, endMinute, 0, 0)

        const slotDuration =
          (endDate.getTime() - startDate.getTime()) / settings.value.bookingsPerSlot

        for (let i = 0; i < settings.value.bookingsPerSlot; i++) {
          const bookingStart = new Date(startDate.getTime() + i * slotDuration)
          const bookingEnd = new Date(bookingStart.getTime() + slotDuration)

          allEvents.push({
            title: `Booking Slot ${i + 1}`,
            start: bookingStart.toISOString(),
            end: bookingEnd.toISOString(),
            extendedProps: {
              slotIndex: i
            }
          })
        }
      }
    }

    return allEvents
  })

  return {
    events
  }
}
