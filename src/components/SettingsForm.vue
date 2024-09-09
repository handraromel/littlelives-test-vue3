<script setup lang="ts">
import { useFormSettings } from '@/composables/useFormSettings'
import { type Settings } from '@/types'
import { durationOptions, days } from '@/constant'

const props = defineProps<{
  settings: Settings
}>()

const emit = defineEmits<{
  (e: 'update:settings', settings: Settings): void
}>()

const { settings, addTimeSlot, removeTimeSlot, updateTimeSlot, isAvailable } = useFormSettings(
  props.settings
)

const updateSettings = () => {
  emit('update:settings', settings.value)
}
</script>

<template>
  <div class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
    <h2 class="mb-4 text-xl font-semibold">Book your visit</h2>

    <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="visitDuration">
        Visit Duration
      </label>
      <select
        id="visitDuration"
        v-model="settings.visitDuration"
        @change="updateSettings"
        class="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      >
        <option v-for="option in durationOptions" :key="option" :value="option">
          {{ option }} min
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="bookingsPerSlot">
        No. of Booking / Session
      </label>
      <input
        id="bookingsPerSlot"
        v-model="settings.bookingsPerSlot"
        @change="updateSettings"
        type="number"
        min="1"
        class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
      />
    </div>

    <div class="mb-4">
      <label class="flex items-center">
        <input
          v-model="settings.allowVideoCall"
          @change="updateSettings"
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-600"
        />
        <span class="ml-2 text-gray-700">Allow video tour call</span>
      </label>
    </div>

    <div class="mb-4">
      <h3 class="mb-2 text-lg font-semibold">Availability</h3>
      <p class="mb-2 text-sm text-gray-600">Set your weekly recurring schedule</p>

      <div v-for="day in days" :key="day" class="mb-2">
        <label class="flex items-center">
          <input
            :checked="isAvailable(day)"
            @change="isAvailable(day) ? (settings.availability[day] = []) : addTimeSlot(day)"
            type="checkbox"
            class="form-checkbox h-5 w-5 text-blue-600"
          />
          <span class="ml-2 text-gray-700">{{ day }}</span>
        </label>

        <div v-if="isAvailable(day)" class="ml-6 mt-2">
          <div
            v-for="(slot, index) in settings.availability[day]"
            :key="index"
            class="sp mb-2 flex items-center"
          >
            <input
              v-model="slot.start"
              @change="updateTimeSlot(day, index, slot.start)"
              type="time"
              step="900"
              class="mr-2 rounded border px-2 py-1 text-gray-700 shadow"
            />
            <span class="mx-2">-</span>
            <input
              :value="slot.end"
              type="time"
              class="mr-2 rounded border px-2 py-1 text-gray-700 shadow"
              disabled
            />
            <button
              @click="removeTimeSlot(day, index)"
              class="mx-4 text-red-500 hover:text-red-700"
            >
              -
            </button>
          </div>
          <button @click="addTimeSlot(day)" class="text-blue-500 hover:text-blue-700">
            + Add time slot
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
