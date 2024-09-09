import { ref, computed, watch } from 'vue'
import { type Settings, type Availability } from '@/types'
import { addMinutesToTime, getNextTimeSlot } from '@/utils'

export function useFormSettings(initialSettings: Settings) {
  const settings = ref<Settings>({ ...initialSettings })

  const addTimeSlot = (day: string) => {
    const slots = settings.value.availability[day]
    const lastSlot = slots[slots.length - 1]
    const startTime = lastSlot ? getNextTimeSlot(lastSlot.end) : '09:00'
    const endTime = addMinutesToTime(startTime, settings.value.visitDuration)
    const newSlot = { start: startTime, end: endTime }
    slots.push(newSlot)
  }

  const removeTimeSlot = (day: string, index: number) => {
    settings.value.availability[day].splice(index, 1)
  }

  const updateTimeSlot = (day: string, index: number, start: string) => {
    const end = addMinutesToTime(start, settings.value.visitDuration)
    settings.value.availability[day][index] = { start, end }
  }

  const isAvailable = computed(() => {
    return (day: string) => settings.value.availability[day].length > 0
  })

  watch(
    () => settings.value.visitDuration,
    (newDuration) => {
      for (const day in settings.value.availability) {
        settings.value.availability[day] = settings.value.availability[day].map((slot) => ({
          start: slot.start,
          end: addMinutesToTime(slot.start, newDuration)
        }))
      }
    }
  )

  return {
    settings,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    isAvailable
  }
}
