<script setup lang="ts">
import { ref } from 'vue'
import SettingsForm from '@/components/SettingsForm.vue'
import SchedulerTable from '@/components/SchedulerTable.vue'
import { type Settings } from '@/types'

const settings = ref<Settings>({
  visitDuration: 30,
  bookingsPerSlot: 1,
  allowVideoCall: false,
  availability: {
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  }
})

const updateSettings = (newSettings: Settings) => {
  settings.value = newSettings
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="mb-4 text-2xl font-bold">School Visit Scheduler</h1>
    <div class="flex flex-col gap-4 md:flex-row">
      <SettingsForm
        :settings="settings"
        @update:settings="updateSettings"
        class="w-full md:w-1/2"
      />
      <SchedulerTable :settings="settings" class="w-full md:w-1/2" />
    </div>
  </div>
</template>
